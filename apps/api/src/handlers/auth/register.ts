import { RequestHandler, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { RequestWithUpload } from 'global-types'
import { getEnv } from '../../utils/index.js'
import jwt from 'jsonwebtoken'
import { zPatchUser } from '@shared/validator'
const prisma = new PrismaClient()

export const postUserRegister = async (
  req: RequestWithUpload,
  res: Response,
) => {
  const user = req.body
  // const imageLinks = req.links ?? []

  // console.log(user)
  try {
    const newUser = await prisma.user.create({
      data: {
        username: user.username,
        password: user.password, //Hash later
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
        Role: user.role,
        // imageID: 1,
        // Image:
        // imageLinks.length === 1?
        //   {
        //     create: {
        //       url: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg',
        //     },
        //   },
        // : undefined,
      },
    })

    res.json(newUser)
  } catch (e) {
    return res.status(400).json('This username or email is already sign in')
  }
}

export const banUser: RequestHandler<{ userId: string }> = async (req, res) => {
  const user = Number(req.params.userId)
  await prisma.user.update({
    where: {
      userId: user,
    },
    data: {
      bannedAt: new Date(),
    },
  })
}

export const putUser: RequestHandler<{ userId: string }> = async (
  req: any,
  res,
) => {
  if (!req.auth) return

  console.log(req.links)

  const parseResult = zPatchUser().safeParse(req.body)
  if (!parseResult.success) {
    res.status(400).send(parseResult.error)
    return
  }
  const auth = req.auth.sub as number
  const user = parseResult.data
  try {
    const newUser = await prisma.user.update({
      where: {
        userId: auth,
      },
      data: {
        username: user.username,
        password: user.password, //Hash later
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
        Image: {
          upsert: req.links[0]
            ? {
                create: {
                  url: req.links[0],
                },
                update: {
                  url: req.links[0],
                },
              }
            : undefined,
        },
      },
      include: {
        Image: true,
      },
    })
    const env = getEnv()
    const { firstName, lastName, email, username, userId, Role, Image } =
      newUser

    const expireInMinute = 30
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
    return res.status(404).json(e)
  }
}
