import { NextFunction, Request, Response, Router } from 'express'
import { getDormsByName, getOneDorm, postDorm } from '~handlers/dorms/dorms.js'
import { postComment } from '~handlers/dorms/comments.js'
import { getDorms } from '~handlers/dorms/dorms.js'
import { checkAuth } from '~middlewares/auth.js'
import { imageUploadBuilder } from '~middlewares/supabaseUserUpload.js'

const dormRouter = Router()

dormRouter.get(
  '/:name',
  // imageUploadBuilder({
  //   type: 'single',
  //   fieldName: 'image',
  // }),
  getDormsByName,
)
//! getDormsByLandmark moved to landmarks
dormRouter.get('/', getDorms)
dormRouter.get('/:id', getOneDorm)
// dormRouter.post('/', postDorm)
dormRouter.post('/:dormId/comment', checkAuth, postComment)
dormRouter.post(
  '/',
  checkAuth,
  imageUploadBuilder({ fieldName: 'images[]', type: 'array', maxCount: 10 }),
  postDorm,
)

export default dormRouter
