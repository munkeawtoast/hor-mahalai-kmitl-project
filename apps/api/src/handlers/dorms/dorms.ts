import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getDorms: RequestHandler = async (req, res) => {
  const dorm = await prisma.dorm.findMany({
    orderBy: [{ name: 'asc' }],
  })
  res.json(dorm)
}

export const getDormsByName: RequestHandler<{ name: string }> = async (
  req,
  res,
) => {
  const dormName = req.params.name
  const dorm = await prisma.dorm.findMany({
    where: {
      name: dormName,
    },
    orderBy: [{ name: 'asc' }],
  })

  res.json(dorm)
}

export const getDormsByLankMark: RequestHandler<{ landmark: string }> = async (
  req,
  res,
) => {
  const landMark = req.params.landmark
  const Dorm = await prisma.dorm.findMany({
    where: {
      Landmarks: {
        name: landMark,
      },
    },
    orderBy: [{ name: 'asc' }],
  })
  res.json(Dorm)
}

export const postDorm: RequestHandler = (req, res) => {}

export const deleteDorm: RequestHandler<{ dormId: string }> = (req, res) => {}

export const patchDorm: RequestHandler<{ dormId: string }> = (req, res) => {}

export const patchApproveDorm: RequestHandler<{ dormId: string }> = (
  req,
  res,
) => {}
