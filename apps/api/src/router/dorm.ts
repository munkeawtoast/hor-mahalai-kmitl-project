import { NextFunction, Request, Response, Router } from 'express'
import { imageUploadBuilder } from '../middlewares/imgbb.js'
import { RequestWithUpload } from 'global-types.js'
import { getDormsByName } from 'handlers/dorms/dorms.js'

const dormRouter = Router()

dormRouter.get('/dorm/:name', getDormsByName)

export default dormRouter
