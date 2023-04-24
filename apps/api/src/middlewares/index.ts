import type { NextFunction, Request, Response } from 'express'

export function logger(req: Request, res: Response, next: NextFunction) {
  const timestamp = new Date().toISOString().substring(0, 19)
  console.log(`${timestamp} ${req.method} ${req.originalUrl}`)
  next()
}
