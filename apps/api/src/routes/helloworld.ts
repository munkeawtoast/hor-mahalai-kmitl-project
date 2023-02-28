import { Request, Response } from 'express'

function helloworld(req: Request, res: Response) {
  res.json({
    message: 'Hello World!',
  })
}

export default {
  helloworld,
}
