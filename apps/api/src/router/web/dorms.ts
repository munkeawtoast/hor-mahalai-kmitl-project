import { NextFunction, Request, Response, Router } from 'express'
import { getOneDorm, postDorm } from '~handlers/dorms/dorms.js'
import { postComment } from '~handlers/dorms/comments.js'
import { getDorms } from '~handlers/dorms/dorms.js'
import { checkAuth } from '~middlewares/auth.js'
import { imageUploadBuilder } from '~middlewares/supabaseUserUpload.js'
import { getAccomodationTypes } from '~handlers/dorms/accomodations.js'

const dormRouter = Router()

dormRouter.get('/', getDorms)
dormRouter.get('/:dormId', getOneDorm)
dormRouter.post('/:dormId/comments', checkAuth, postComment)
dormRouter.post(
  '/',
  checkAuth,
  imageUploadBuilder({ fieldName: 'images[]', type: 'array', maxCount: 12 }),
  postDorm,
)
dormRouter.put(
  '/',
  checkAuth,
  imageUploadBuilder({ fieldName: 'images[]', type: 'array', maxCount: 10 }),
)

dormRouter.get('/accomodations', getAccomodationTypes)

export default dormRouter
