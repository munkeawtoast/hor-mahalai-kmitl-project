import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'

import { zPostDorm, zPatchDorm } from '@shared/validator'
import { Request as JwtRequest } from 'express-jwt'

const prisma = new PrismaClient()

export const getDorms: RequestHandler = async (req, res) => {
  const queryOwnerId = req.query.ownerid ? Number(req.query.ownerid) : undefined
  const queryName = req.query.name
  const queryLandmark = req.query.landmarkid
    ? Number(req.query.landmarkid)
    : undefined
  const queryUniversity = req.query.uniid ? Number(req.query.uniid) : undefined

  const dormResult = await prisma.dorm.findMany({
    where: {
      userID: queryOwnerId,
    },
    orderBy: [{ name: 'asc' }],
    include: {
      Ratings: true,
      Accommodations: true,
      Landmarks: true,
    },
  })
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

export const getDormsByName: RequestHandler<{ name: string }> = async (
  req,
  res,
) => {
  const dormName = req.params.name
  const dormResult = await prisma.dorm.findMany({
    where: {
      name: dormName,
    },
    orderBy: [{ name: 'asc' }],
    include: {
      Ratings: true,
      Accommodations: true,
    },
  })

  const dormResultFilter = dormResult.map(value => {
    const ratingsCount = value.Ratings.length
    const ratingsTotal = value.Ratings.reduce((acc, b) => acc + b.score, 0)
    return {
      ...value,
      userRating: ratingsCount ? ratingsTotal / ratingsCount : 0,
    }
  })
  res.json(dormResultFilter)
}

export const getDormsByLandmark: RequestHandler<{ landmark: string }> = async (
  req,
  res,
) => {
  const landMark = req.params.landmark
  const dormResult = await prisma.dorm.findMany({
    where: {
      Landmarks: {
        name: landMark,
      },
    },
    orderBy: [{ name: 'asc' }],
    include: {
      Ratings: true,
      Accommodations: true,
    },
  })
  const dormResultFilter = dormResult.map(value => {
    const ratingsCount = value.Ratings.length
    const ratingsTotal = value.Ratings.reduce((acc, b) => acc + b.score, 0)
    return {
      ...value,
      userRating: ratingsCount ? ratingsTotal / ratingsCount : 0,
    }
  })
  res.json(dormResultFilter)
}

export const getOneDorm: RequestHandler<{ dormid: number }> = async (
  req,
  res,
) => {
  const dorm = req.params.dormid
  const dormResult = await prisma.dorm.findFirst({
    where: {
      dormID: dorm,
    },
    include: {
      Ratings: true,
      Accommodations: true,
    },
  })
  if (dormResult == null) {
    res.status(400).send({ error: 'not found' })
    return
  }
  res.json(dormResult)
}

export const postDorm: RequestHandler = async (req: JwtRequest, res) => {
  if (!req.auth) return

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
      Rooms: {
        createMany: {
          data: dormData.rooms.map(room => ({
            length: room.length,
            name: room.name,
            price: room.price,
            width: room.width,
          })),
        },
      },
    },
    include: {
      Rooms: true
    },
  })

  res.json(addDorm)
}

export const deleteDorm: RequestHandler<{ dormId: string }> = (req, res) => { }

export const putDorm: RequestHandler = async (req: JwtRequest, res) => {
  if (!req.auth) return

  const parseResult = zPatchDorm().safeParse(req.body)
  if (!parseResult.success) return res.status(400).send(parseResult.error)

  const dormID = parseResult.data.dormid
  const dormData = parseResult.data
  const { line, telnum, facebook } = dormData.contacts
  const newDorm = await prisma.dorm.update({
    where: {
      dormID: dormID,
    },
    data: {
      userID: Number(req.auth.sub),
      name: dormData.name,
      address: dormData.address,
      latitude: dormData.position[0],
      longitude: dormData.position[1],
      description: dormData.description,
      waterRate: dormData.waterrate,
      electricityRate: dormData.electricityrate,
      landmarkID: dormData.landmark,
      contactFacebook: facebook || undefined,
      contactLine: line || undefined,
      contactTelnum: telnum,
      Rooms: {
        i,
        // createMany: {
        //   data: dormData.rooms.map(room => ({
        //     length: room.length,
        //     name: room.name,
        //     price: room.price,
        //     width: room.width,
        //   })),
        // },
      },
    },
  })
}

export const patchApproveDorm: RequestHandler<{ dormId: string }> = (
  req,
  res,
) => { }
