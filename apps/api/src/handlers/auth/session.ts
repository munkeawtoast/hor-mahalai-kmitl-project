import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
import { zLogin } from '@shared/validator'
import { getEnv } from '../../utils/index.js'
import { Request as JwtRequest, expressjwt } from 'express-jwt'
import jwt from 'jsonwebtoken'

export const extendSession: RequestHandler = (req: JwtRequest, res, next) => {
  if (!req.auth) {
    return next()
  }
  const {} = req.auth
}
