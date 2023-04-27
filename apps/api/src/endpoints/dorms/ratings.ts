import { RequestHandler } from 'express'

export const postRating: RequestHandler<{ dormId: string }> = (req, res) => {
  const { rating } = req.body
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
