import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
import { Request as JwtRequest } from 'express-jwt'
const prisma = new PrismaClient()

export const postRating: RequestHandler<{ dormId: string }> = async (
  req: JwtRequest,
  res,
) => {
  if (!req.auth) return res.status(401).json({ message: 'please log in' })
  const userid = req.auth.sub
  const rating = req.body.data
  console.log(rating)
  const checkRating = await prisma.rating.findMany({
    where: {
      userID: Number(userid),
    },
  })
  if (checkRating.length === 0) {
    await prisma.rating.create({
      data: {
        userID: Number(userid),
        dormID: rating.dormid,
        score: rating.rating,
      },
    })
  } else {
    console.log('no')
  }
}

export const putRating: RequestHandler<{ ratingId: string }> = (req, res) => {
  const { rating } = req.body
}

export const deleteRating: RequestHandler<{ ratingId: string }> = (
  req,
  res,
) => {
  const { ratingId } = req.params
}
