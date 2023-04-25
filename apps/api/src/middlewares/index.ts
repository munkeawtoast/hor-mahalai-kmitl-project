import type { NextFunction, Request, Response } from 'express'
import { RequestWithAuth } from 'env'

export async function loggerProvider(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const timestamp = new Date().toISOString().substring(0, 19)
  console.log(`${timestamp} ${req.method} ${req.originalUrl}`)
  next()
}

export async function authProvider(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // const token = req.headers.authorization?.split(' ')[1]
  // if (token) {
  //   try {
  //     const payload = jwt.verify(token, process.env.JWT_SECRET)
  //     req.user = payload as any
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
  // next()
}

export function requireAuth(
  req: RequestWithAuth,
  res: Response,
  next: NextFunction,
) {
  if (req.user) {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

export function requireAdmin(
  req: RequestWithAuth,
  res: Response,
  next: NextFunction,
) {
  if (req.user?.role === 'admin') {
    next()
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
