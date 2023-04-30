import { RequestHandler, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { RequestWithUpload } from 'global-types'
const prisma = new PrismaClient()

export const postUser = async (req: RequestWithUpload, res: Response) => {
  const user = req.body
  const imageLinks = req.links ?? []

  const newUser = await prisma.user.create({
    data: {
      username: user.userName,
      password: user.passWord, //Hash later
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      Role: user.role,
      Image:
        imageLinks.length === 1
          ? {
              create: {
                url: imageLinks[0],
              },
            }
          : undefined,
    },
  })

  res.json(newUser)
}

export const deleteUser: RequestHandler<{ userId: string }> = (req, res) => {}

export const patchUser: RequestHandler<{ userId: string }> = (req, res) => {}
