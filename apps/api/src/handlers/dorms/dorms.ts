import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'

import { zPostDorm } from '@shared/validator'

const prisma = new PrismaClient()

export const getDorms: RequestHandler = async (req, res) => {
  const dormResult = await prisma.dorm.findMany({
    orderBy: [{ name: 'asc' }],
    include: {
      Ratings: true,
      Accommodations: true,
    },
  })
  const dormResultFilter = dormResult.map((value) => {
    const ratingsCount = value.Ratings.length
    const ratingsTotal = value.Ratings.reduce((acc, b) => acc + b.score, 0)
    return {
      ...value,
      userRating: ratingsCount ? ratingsTotal / ratingsCount : 0,
    }
  })
  res.json(dormResultFilter)
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

  const dormResultFilter = dormResult.map((value) => {
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
  const dormResultFilter = dormResult.map((value) => {
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

export const postDorm: RequestHandler = async (req, res) => {
  const parseResult = zPostDorm.safeParse(req.body)
  if (!parseResult.success) {
    res.status(400).send(parseResult.error)
    return
  }
  const dormData = parseResult.data
  const addDorm = await prisma.dorm.create({
    data: {
      userID: 1,
      name: dormData.name,
      address: dormData.address,
      latitude: dormData.latitude,
      longitude: dormData.longitude,
      description: dormData.description,
      waterRate: dormData.waterrate,
      electricityrate: dormData.electricityrate,
      landmarkID: 1,
    },
  })

  // res.json(addDorm)
}

export const deleteDorm: RequestHandler<{ dormId: string }> = (req, res) => {}

export const patchDorm: RequestHandler<{ dormId: string }> = (req, res) => {}

export const patchApproveDorm: RequestHandler<{ dormId: string }> = (
  req,
  res,
) => {}
