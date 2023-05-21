import { expressjwt, Request as JwtRequest } from 'express-jwt'
import { NextFunction, Response, Request, RequestHandler } from 'express'
import { getEnv } from '../utils/index.js'

export const checkAuth: RequestHandler = expressjwt({
  secret: getEnv().JWT_SECRET,
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
