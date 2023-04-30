import { NextFunction, Request, Response, Router } from 'express'
import { getDormsByName, postDorm } from '~handlers/dorms/dorms.js'
import { getDormsByLandmark } from '~handlers/dorms/dorms.js'
import { getDorms } from '~handlers/dorms/dorms.js'

const dormRouter = Router()

dormRouter.get('/:name', getDormsByName)
dormRouter.get('/landmark/:landmark', getDormsByLandmark)
dormRouter.get('/', getDorms)

dormRouter.post('/', postDorm)

export default dormRouter
