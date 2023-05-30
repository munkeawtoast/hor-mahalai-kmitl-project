import type { RequestHandler, ErrorRequestHandler } from 'express'

export const logger: RequestHandler = async (req, _, next) => {
  const timestamp = new Date().toISOString().substring(0, 19)
  console.log(`${timestamp} ${req.method} ${req.originalUrl}`)
  next()
}

export const errorLogger: ErrorRequestHandler = async (err, req, res, next) => {
  console.log(`Error: ${err} occured at route ${req.originalUrl}`)
  next(err)
}
