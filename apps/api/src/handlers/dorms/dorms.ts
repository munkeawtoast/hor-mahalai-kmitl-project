import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const getDorms: RequestHandler = (req, res) => {}

export const getDormsByName: RequestHandler<{ name: string }> = async (
  req,
  res,
) => {
  const dormName = req.params.name
  const Dorm = await prisma.dorm.findMany({
    where: {
      name: dormName,
    },
  })
  res.json(Dorm)
}

export const getDormsByLankMark: RequestHandler<{ landmark: string }> = async (
  req,
  res,
) => {
  const dormName = req.params.landmark
  const Dorm = await prisma.dorm.findMany({
    where: {
      name: dormName,
    },
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
