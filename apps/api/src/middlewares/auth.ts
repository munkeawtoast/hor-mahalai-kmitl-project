import { expressjwt, Request as JwtRequest } from 'express-jwt'
import { NextFunction, Response, Request, RequestHandler } from 'express'
import { config } from 'dotenv'
import { Env } from 'global-types'

config()

const env = process.env as Env

export const checkAuth: RequestHandler = expressjwt({
  secret: env.JWT_SECRET,
  algorithms: ['HS256'],
})

export const userIdGuard = (
  req: JwtRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.auth?.aud !== 'ADMIN') {
    res.status(403).json({
      error: 'Forbidden',
    })
    return
  }
  next()
}
