import { zPostComment } from '@shared/validator'
import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
import { Request as JwtRequest } from 'express-jwt'

const prisma = new PrismaClient()

// const getComment: RequestHandler<{ dormId: string }> = (req, res) => {}

export const postComment: RequestHandler<{ dormId: string }> = async (
  req: JwtRequest,
  res,
) => {
  if (!req.auth) return
  const dormId = parseInt(req.params.dormId)
  const parseResult = zPostComment().safeParse(req.body)
  if (!parseResult.success) return res.status(400).send(parseResult.error)

  const description = req.body.description as string
  const auth = parseInt(req.auth.sub as string)

  const createComment = await prisma.comment.create({
    data: {
      description: description,
      userID: auth,
      dormID: dormId,
    },
  })
  if (createComment) {
    return res.status(201).json({ message: 'success' })
  }
}

export const deleteComment: RequestHandler<{ commentId: string }> = async (
  req: JwtRequest,
  res,
) => {
  if (!req.auth) {
    return res.status(401).json({ error: 'no auth' })
  }
  const isAdmin = req.auth.aud === 'ADMIN'
  const commentId = parseInt(req.params.commentId)
  const ownerid = parseInt(req.auth.sub as string)

  if (Number.isNaN(commentId)) {
    return res.status(400).json({ error: 'bad comemnt id' })
  }

  const comment = await prisma.comment.findFirst({
    where: {
      commentID: commentId,
    },
  })

  if (!comment) {
    return res.status(404).json({ error: 'comment doenst exist' })
  }

  if (comment.userID !== ownerid && !isAdmin) {
    return res.status(403).json({ error: 'bad comemnt id' })
  }

  const deleted = await prisma.comment.delete({
    where: {
      commentID: comment.commentID,
    },
  })
  if (!deleted) {
    return res.status(505).json({
      error: 'error server',
    })
  }
  return res.status(200).json({
    message: 'success',
  })
}
export const putComment: RequestHandler<{ commentId: string }> = async (
  req: JwtRequest,
  res,
) => {
  if (!req.auth) return
  const isAdmin = req.auth.aud === 'ADMIN'
  const parseResult = zPostComment().safeParse(req.body)

  if (!parseResult.success) return res.status(400).send(parseResult.error)

  const description = req.body.description as string
  const auth = parseInt(req.auth.sub as string)

  const commentId = parseInt(req.params.commentId)

  if (Number.isNaN(commentId)) {
    return res.status(400).json({ error: 'bad comment id' })
  }
  const comment = await prisma.comment.findFirst({
    where: {
      commentID: commentId,
    },
  })

  if (!comment) {
    return res.status(404).json({ error: 'comment doenst exist' })
  }

  if (comment.userID !== auth && !isAdmin) {
    return res.status(403).json({ error: 'forbidden' })
  }

  const editComment = await prisma.comment.update({
    where: {
      commentID: commentId,
    },
    data: {
      description: description,
    },
  })

  return res.json({ message: 'success' })
}
