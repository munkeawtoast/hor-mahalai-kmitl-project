import { NextFunction, Request, Response, Router } from 'express'
import { getDormsByName, getOneDorm, postDorm } from '~handlers/dorms/dorms.js'
import { getDormsByLandmark } from '~handlers/dorms/dorms.js'
import { getDorms } from '~handlers/dorms/dorms.js'
import { imageUploadBuilder } from '~middlewares/imgbb'

const dormRouter = Router()

dormRouter.get(
  '/:name',
  imageUploadBuilder({
    type: 'single',
    fieldName: 'image',
  }),
  getDormsByName,
)
dormRouter.get('/landmark/:landmark', getDormsByLandmark)
dormRouter.get('/', getDorms)
dormRouter.get('/:id', getOneDorm)
dormRouter.post('/', postDorm)

export default dormRouter
