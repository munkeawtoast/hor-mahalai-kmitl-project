import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
import { zLogin } from '@shared/validator'
import jwt from 'jsonwebtoken'
import { getEnv } from '../../utils/index.js'

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
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: parseResult.data.username },
          { email: parseResult.data.username },
        ],
        password: parseResult.data.password,
      },
      include: {
        Image: true,
      },
    })

    if (!foundUser) {
      throw new Error('No user found!')
    }

    const env = getEnv()
    const { firstName, lastName, email, username, userId, Role } = foundUser

    const expireInMinute = 30
    const token = jwt.sign(
      {
        sub: userId,
        aud: Role,
        firstName,
        lastName,
        email,
        username,
        profImgLink: foundUser.Image?.url,
      },
      env.JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: new Date().getTime() + expireInMinute * 60 * 1000,
      },
    )

    res.status(201).json({
      token,
      success: true,
    })
  } catch (e) {
    res.status(400).json({
      error: 'a',
    })
  }
}
