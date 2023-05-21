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

    console.log(foundUser?.Image?.url)

    if (!foundUser) {
      // throw new Error('No user found!')
      return res.status(404).json('No user found!')
    }
    if (foundUser.bannedAt != null) {
      // throw new Error("You're banned")
      return res.status(403).json("You're banned")
    }

    const env = getEnv()
    const { firstName, lastName, email, username, userId, Role, Image } =
      foundUser

    const expireInMinute = 3000000000
    const token = jwt.sign(
      {
        sub: userId,
        aud: Role,
        firstname: firstName,
        lastname: lastName,
        email,
        username,
        Role,
        image_link: Image?.url,
      },
      env.JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: new Date().getTime() + expireInMinute * 60 * 1000,
      },
    )

    return res.status(201).json({
      token,
      success: true,
    })
  } catch (e) {
    return res.status(404).json('e')
  }
}
