import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
import { zLogin } from '@shared/validator'

const prisma = new PrismaClient()

export const getUserDorms: RequestHandler = (req, res) => {}

export const getUserDetails: RequestHandler<{ userId: string }> = (
  req,
  res,
) => {}

export const getSelfDetails: RequestHandler = (req, res) => {}

export const postUserLogin: RequestHandler = async (req, res) => {
  const parseResult = zLogin().safeParse(req.body)
  if (!parseResult.success) {
    res.status(400).send(parseResult.error)
    return
  }
  const createUser = await prisma.user.findFirst({
    where: {
      OR: [
        { username: parseResult.data.username },
        { email: parseResult.data.username },
      ],
      password: parseResult.data.password,
    },
  })
  res.json(createUser)
}
