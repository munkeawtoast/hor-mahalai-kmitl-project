import { Request as JwtRequest } from 'express-jwt'
import { JwtPayload } from 'jsonwebtoken'
import { Request as ExpressRequest } from 'express'

export type Payload = JwtPayload & {
  
}

export type Request<T = Payload> = ExpressRequest & {
  auth?: T
}
