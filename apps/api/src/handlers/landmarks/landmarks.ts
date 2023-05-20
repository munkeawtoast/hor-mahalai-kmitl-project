import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'

export const getUniversities: RequestHandler = async (req, res) => {
  const prisma = new PrismaClient()
  const universities = await prisma.landmark.findMany({
    where: {
      parentUniversityID: null,
    },
    orderBy: {
      landmarkID: 'asc',
    },
    select: {
      name: true,
      landmarkID: true,
    },
  })
  const reshaped = universities.map(uni => ({
    id: uni.landmarkID,
    name: uni.name,
  }))
  console.log(reshaped)
  return res.json(reshaped)
}

// export const getLandmarks: RequestHandler = async (req, res) => {
//   const prisma = new PrismaClient()
//   const universities = await prisma.landmark.findMany({
//     where: {
//       LandmarksInUniversity: {
//         none: {},
//       },
//     },
//     select: {
//       name: true,
//       landmarkID: true,
//     },
//   })
//
//   const reshaped = universities.map(uni => ({
//     id: uni.landmarkID,
//     name: uni.name,
//   }))
//   console.log(reshaped)
//   return res.json(reshaped)
// }

export const getUniversityIdLandmarks: RequestHandler<{
  landmarkId: string
}> = async (req, res) => {
  const landmarkID = Number(req.params.landmarkId)
  const prisma = new PrismaClient()
  try {
    const universities = await prisma.landmark.findFirstOrThrow({
      where: {
        landmarkID,
        parentUniversityID: null,
      },
      include: {
        LandmarksInUniversity: true,
      },
    })
    return res.json(
      universities.LandmarksInUniversity.map(area => ({
        id: area.landmarkID,
        name: area.name,
      })),
    )
  } catch (e) {
    return res.status(404).json({
      error: `No university of id '${req.params.landmarkId}'`,
    })
  }
}
