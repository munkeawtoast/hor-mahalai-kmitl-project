import { NextFunction, Request, Response, Router } from 'express'
import { deleteDorm, getOneDorm, postDorm } from '~handlers/dorms/dorms.js'
import { getAccomodationTypes } from '~handlers/dorms/accomodations.js'
import { postComment } from '~handlers/dorms/comments.js'
import { getDorms } from '~handlers/dorms/dorms.js'
import { checkAuth } from '~middlewares/auth.js'
import { imageUploadBuilder } from '~middlewares/supabaseUserUpload.js'
import { postRating } from '~handlers/dorms/ratings.js'

const dormRouter = Router()

dormRouter.get('/', getDorms)
dormRouter.get('/accomodations', getAccomodationTypes)
dormRouter.get('/:dormId(\\d+)', getOneDorm)
dormRouter.post('/:dormId(\\d+)/comments', checkAuth, postComment)
dormRouter.post('/addrating', checkAuth, postRating)
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
dormRouter.delete('/:dormId', checkAuth, deleteDorm)


export default dormRouter
