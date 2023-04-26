import type { NextFunction, Request, Response } from 'express'
import { Env, RequestWithAuth } from 'global-types'
import jwt, { expressjwt } from 'express-jwt'
import { config } from 'dotenv'

config()

const env = process.env as Env

export async function loggerProvider(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const timestamp = new Date().toISOString().substring(0, 19)
  console.log(`${timestamp} ${req.method} ${req.originalUrl}`)
  next()
}

export const requireAuth = expressjwt({
  secret: env.JWT_SECRET,
  algorithms: ['HS256'],
})
