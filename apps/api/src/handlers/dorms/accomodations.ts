import { PrismaClient } from '@prisma/client'
import { RequestHandler } from 'express'

const prisma = new PrismaClient()

export const getAccomodationTypes: RequestHandler = async (req, res) => {
  const type = req.query.type as string
  if (!(type === 'DORM' || type === 'ROOM')) {
    return res.status(400).send({ message: 'allowed type: ["DORM" | "ROOM"]' })
  }

  const accomodations = await prisma.accommodationType.findMany({
    where: {
      AccommodationCategory: type,
    },
  })
  return res.status(200).send(
    accomodations.map(acc => ({
      id: acc.accommodationTypeID,
      name: acc.accommodationName,
    })),
  )
}
