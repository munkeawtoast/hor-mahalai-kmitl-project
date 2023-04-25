import type { NextFunction, Request, RequestHandler, Response } from 'express'

export function helloworld(req: Request, res: Response, next: NextFunction) {
  res.json({
    message: 'Hello World!',
    somethingelse: 'wtf!!!',
  })
}
