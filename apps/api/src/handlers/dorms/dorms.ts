import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'

import { zPostDorm, zPatchDorm } from '@shared/validator'
import { Request as JwtRequest, Request as JwtRequest } from 'express-jwt'

const prisma = new PrismaClient()

export const getDorms: RequestHandler = async (req: JwtRequest, res) => {
  let isAdmin
  if (req.auth?.aud === 'ADMIN') {
    isAdmin = true
  }

  const queryOwnerId = req.query.ownerid ? Number(req.query.ownerid) : undefined
  const queryName = req.query.query as string
  const queryLandmark = req.query.landmarkid
    ? Number(req.query.landmarkid)
    : undefined
  const queryUniversity = req.query.uniid ? Number(req.query.uniid) : undefined

  let dormResult = await prisma.dorm.findMany({
    where: {
      userID: queryOwnerId,
      landmarkID: queryLandmark,
      // NOT: {
      //   approvedAt: isAdmin ? null : undefined
      // }
    },
    orderBy: [{ name: 'asc' }],
    include: {
      Ratings: true,
      Accommodations: true,
      Landmarks: true,
      DormImages: true,
      Rooms: true,
    },
  })
  if (queryUniversity) {
    dormResult = dormResult.filter(
      dorm => dorm.Landmarks.parentUniversityID === queryUniversity,
    )
  }

  if (queryName) {
    dormResult = dormResult.filter(dorm => dorm.name.includes(queryName))
  }

  const dormsOut = dormResult.map(value => {
    const ratingsCount = value.Ratings.length
    const ratingsTotal = value.Ratings.reduce((acc, b) => acc + b.score, 0)
    return {
      ...value,
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

  const dorm = Number(req.params.dormId)
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
          Accommodations: true,
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
        select: {
          score: true,
        },
      },
      Accommodations: true,
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
  if (!req.auth) return next(new Error('no auth'))
  if (!req.links) return next(new Error('no images'))

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
        createMany: {
          data: [
            {
              accommodationTypeID: 
            },
          ],
        },
        // connect: dormData.accomodations.filter(acc => acc.value).map(acc => ({
        //   accomodationID: acc.name
        // }))
      },
      Rooms: {
        create: [
          {
            Accommodations: {
              createMany: {
                data: [
                  {
                    accommodationTypeID,
                  },
                ],
              },
            },
          },
        ],
        // createMany: {
        //   data: dormData.rooms.map(room => ({
        //     length: room.length,
        //     name: room.name,
        //     price: room.price,
        //     width: room.width,
        //   })),
        // },
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

    include: {
      Rooms: true,
    },
  })

  res.json(addDorm)
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

