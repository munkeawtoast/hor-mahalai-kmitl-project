import { NextFunction, Request, Response, Router } from 'express'
import { imageUploadBuilder } from '../../middlewares/imgbb.js'
import { RequestWithUpload } from 'global-types.js'

const helloworldRouter = Router()

helloworldRouter.get(
  '/',
  async function (req: Request, res: Response, next: NextFunction) {
    res.json({
      message: 'Hello World!',
    })
  },
)

helloworldRouter.post(
  '/expect-image-upload',
  ...imageUploadBuilder({
    type: 'single',
    fieldName: 'image'
  }),
  function (req: any, res, next) {

    console.log(req.links)
    console.log(req.files)
    console.log(req.file)
    res.send('ok')
  },
)

export default helloworldRouter
