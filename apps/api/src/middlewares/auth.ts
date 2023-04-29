import { expressjwt } from 'express-jwt'
import { RequestHandler } from 'express'
import { config } from 'dotenv'
import { Env } from 'global-types'

config()

const env = process.env as Env

export const checkAuth: RequestHandler = expressjwt({
  secret: env.JWT_SECRET,
  algorithms: ['HS256'],
})
