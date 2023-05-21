import { RequestHandler, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { RequestWithUpload } from 'global-types'
import { create } from 'ts-node'
const prisma = new PrismaClient()

export const postUserRegister = async (
  req: RequestWithUpload,
  res: Response,
) => {
  const user = req.body
  const imageLinks = req.links ?? []

  console.log(user)

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
}

export const deleteUser: RequestHandler<{ userId: string }> = (req, res) => {}

export const patchUser: RequestHandler<{ userId: string }> = async (
  req: any,
  res,
) => {
  if (!req.auth) return

  const auth = req.auth.sub as number
  const user = req.body
  const imageLinks = req.links ?? []

  const newUser = await prisma.user.update({
    where: {
      userId: user.username,
    },
    data: {
      username: user.username,
      password: user.password, //Hash later
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
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

  // res.json(newUser)
}
