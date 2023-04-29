import { expressjwt } from 'express-jwt'
import { RequestHandler } from 'express'

export const checkAuth: RequestHandler = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
})

