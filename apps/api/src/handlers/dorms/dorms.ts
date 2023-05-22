import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'

import { zPostDorm, zPatchDorm } from '@shared/validator'
import { Request as JwtRequest } from 'express-jwt'

const prisma = new PrismaClient()

export const getDorms: RequestHandler = async (req: JwtRequest, res) => {
  const isAdmin = req.auth?.aud === 'ADMIN'

  let count = parseInt(req.query.count as string)
  let startPoint = parseInt(req.query.start as string)
  const queryOwnerId = req.query.ownerid ? Number(req.query.ownerid) : undefined
  const queryName = req.query.query as string
  const queryLandmark = req.query.landmarkid
    ? Number(req.query.landmarkid)
    : undefined
  const queryUniversity = req.query.uniid ? Number(req.query.uniid) : undefined

  if (Number.isNaN(count)) {
    count = 10
  }
  if (Number.isNaN(startPoint)) {
    startPoint = 0
  }

  let dormResult = await prisma.dorm.findMany({
    where: {
      userID: queryOwnerId,
      landmarkID: queryLandmark,
      // NOT: {
      //   approvedAt: isAdmin ? null : undefined
      // }
    },
    // skip: startPoint,
    // take: count,
    orderBy: [{ dormID: 'asc' }],
    include: {
      Ratings: {
        select: {
          score: true,
        },
      },
      Landmarks: {
        select: {
          name: true,
          ParentUniversity: {
            select: {
              landmarkID: true,
              name: true,
            },
          },
        },
      },
      Accommodations: {
        where: {
          accommodationTypeID: {
            in: [20, 19, 15],
          },
        },
      },
      Rooms: {
        select: {
          price: true,
        },
      },
      DormImages: true,
    },
  })
  if (queryUniversity) {
    dormResult = dormResult.filter(
      dorm => dorm.Landmarks.ParentUniversity?.landmarkID === queryUniversity,
    )
  }

  if (queryName) {
    dormResult = dormResult.filter(dorm => dorm.name.includes(queryName))
  }

  const dormsOut = dormResult.map(d => {
    const basePrices = d.Rooms.map(r => r.price)
    basePrices.sort((a, b) => a - b)
    const priceRange = [basePrices[0], basePrices[-1]]

    const ratingsCount = d.Ratings.length
    const ratingsTotal = d.Ratings.reduce((acc, b) => acc + b.score, 0)
    return {
      ...d,
      name: d.name,
      priceRange,
      landmark: d.Landmarks.name,
      university: d.Landmarks.ParentUniversity?.name,
      images: d.DormImages.map(a => a.url),
      id: d.dormID,

      userRating: ratingsCount ? ratingsTotal / ratingsCount : 0,
    }
  })
  res.json(dormsOut)
}

export const getOneDorm: RequestHandler<{ dormId: string }> = async (
  req: JwtRequest,
  res,
) => {
  let isAdmin = req.auth?.aud === 'ADMIN'

  const dorm = parseInt(req.params.dormId)

  if (Number.isNaN(dorm)) return res.status(400).json({ message: 'bad dormid' })

  const dormResult = await prisma.dorm.findFirst({
    where: {
      dormID: dorm,
      // NOT: {
      //   approvedAt: isAdmin ? null : undefined
      // }
    },
    include: {
      Rooms: {
        include: {
          Accommodations: { include: { AccommodationType: true } },
        },
      },
      Comments: {
        where: {
          parentCommentID: null,
        },
        include: {
          ChildrenComments: true,
        },
      },
      DormImages: true,
      User: {
        select: {
          firstName: true,
          lastName: true,
        },
      },

      Ratings: {
        // select: {
        //   score: true,
        // },
      },
      Accommodations: { include: { AccommodationType: true } },
    },
  })
  if (!dormResult) {
    res.status(404).send({ error: 'not found' })
    return
  }
  res.json(dormResult)
}

export const postDorm: RequestHandler = async (
  req: JwtRequest & { links?: string[] },
  res,
  next,
) => {
  if (!req.auth) return res.status(401).json({ error: 'bad' })
  if (!req.links) return res.status(400).json({ error: 'no images' })

  console.log(req.body)

  const parseResult = zPostDorm({ coerce: true }).safeParse(req.body)
  if (!parseResult.success) return res.status(400).send(parseResult.error)

  const dormData = parseResult.data
  const { line, telnum, facebook } = dormData.contacts
  const addDorm = await prisma.dorm.create({
    data: {
      userID: Number(req.auth.sub),
      name: dormData.name,
      address: dormData.address,
      latitude: dormData.lat,
      longitude: dormData.lng,
      description: dormData.description,
      waterRate: dormData.waterrate,
      electricityRate: dormData.electricityrate,
      landmarkID: dormData.landmark,
      contactFacebook: facebook || undefined,
      contactLine: line || undefined,
      contactTelnum: telnum,
      Accommodations: {
        create: dormData.accomodations.map(acc => ({
          accommodationTypeID: acc.id,
        })),
      },
      Rooms: {
        create: dormData.rooms.map(room => ({
          width: room.width,
          price: room.price,
          name: room.name,
          length: room.length,
          Accommodations: {
            create: room.accomodations.map(acc => ({
              accommodationTypeID: acc.id,
            })),
          },
        })),
      },
      DormImages: {
        createMany: req.links
          ? {
              data: req.links.map(url => ({
                url,
              })),
            }
          : undefined,
      },
    },
  })

  await prisma.ticket.create({
    data: {
      title: 'Request Approval',
      userID: addDorm.userID,
      TicketCategory: 'DORM',
      description: '',
      dormID: addDorm.dormID,
    },
  })

  return res.status(201).json({
    message: 'success',
    id: addDorm.dormID,
  })
}

export const deleteDorm: RequestHandler<{ dormId: string }> = async (
  req: JwtRequest,
  res,
) => {
  if (!req.auth || req.auth.aud === 'USER') {
    return res.status(403).json({ error: '' })
  }

  const id = Number(req.params.dormId)

  const dorm = await prisma.dorm.findFirst({
    where: {
      dormID: id,
    },
  })

  if (!dorm) {
    return res.status(404).json({ error: 'dorm not found' })
  }
  if (dorm.userID !== Number(req.auth.sub) && req.auth.aud !== 'ADMIN') {
    return res.status(403).json({ error: 'forbidden' })
  }

  await prisma.dorm.delete({
    where: {
      dormID: id,
    },
  })
  return res.status(200).json({ message: 'dorm deleted successfully' })
}

export const approveDorm: RequestHandler<{ dormId: string }> = async (
  req: JwtRequest,
  res,
) => {
  // if (!req.auth || req.auth.aud === 'USER') {
  //   return res.status(403).json({ error: '' })
  // }
  // console.log(req.params)
  const id = Number(req.params.dormId)

  const dorm = await prisma.dorm.update({
    where: {
      dormID: id,
    },
    data: {
      approvedAt: new Date(),
      approvedBy: 'ADMIN',
    },
  })

  if (!dorm) {
    return res.status(404).json({ error: 'dorm not found' })
  }
  // // if (dorm.userID !== Number(req.auth.sub) && req.auth.aud !== 'ADMIN') {
  // //   return res.status(403).json({ error: 'forbidden' })
  // // }

  // // await prisma.dorm.delete({
  // //   where: {
  // //     dormID: id,
  // //   },
  // // })
  return res.status(200).json({ message: 'dorm Approved' })
}
