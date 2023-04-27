import { RequestHandler } from 'express'

export const postSession: RequestHandler = (req, res) => {
  const { token } = req.body
}

export const postLogin: RequestHandler = (req, res) => {
  const { email, password } = req.body
}
