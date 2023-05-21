import { RequestHandler } from 'express'

// export const logger: RequestHandler = async (req, res, next) => {
//   console.log(req.url)
//   next()
// }

export const logger: RequestHandler = async (req, _, next) => {
  const timestamp = new Date().toISOString().substring(0, 19)
  console.log(`${timestamp} ${req.method} ${req.originalUrl}`)
  next()
}
