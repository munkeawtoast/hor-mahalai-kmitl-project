import { zPostComment } from '@shared/validator'
import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
import { Request } from 'express-jwt'

const prisma = new PrismaClient()

const getComment: RequestHandler<{ dormId: string }> = (req, res) => {}

export const postComment: RequestHandler<{ dormId: string }> = async (
  req: any,
  res,
) => {
  if (!req.auth) return
  const dormId = Number(req.params.dormId)
  const parseResult = zPostComment().safeParse(req.body)
  if (!parseResult.success) return res.status(400).send(parseResult.error)

  const description = req.body.description as string
  const auth = req.auth.sub as number

  const createComment = await prisma.comment.create({
    data: {
      description: description,
      userID: auth,
      dormID: dormId,
    },
  })
}
const deleteComment: RequestHandler<{ commentId: string }> = (req, res) => {
  const { commentId } = req.params
}

const patchComment: RequestHandler<{ commentId: string }> = (req, res) => {
  const { commentId } = req.params
  const { description } = req.body.data
}
