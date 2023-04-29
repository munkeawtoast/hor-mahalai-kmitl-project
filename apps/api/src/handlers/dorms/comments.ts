import { RequestHandler } from 'express'

const getComment: RequestHandler<{ dormId: string }> = (req, res) => {}

const postComment: RequestHandler<{ dormId: string }> = (req, res) => {
  const { description } = req.body.data
}

const deleteComment: RequestHandler<{ commentId: string }> = (req, res) => {
  const { commentId } = req.params
}

const patchComment: RequestHandler<{ commentId: string }> = (req, res) => {
  const { commentId } = req.params
  const { description } = req.body.data
}
