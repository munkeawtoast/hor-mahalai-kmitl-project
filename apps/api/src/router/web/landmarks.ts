import { Router } from 'express'
import { getDormsByLandmark } from '~handlers/dorms/index.js'

const landmarkRouter = Router()

landmarkRouter.get('/:landmark/', getDormsByLandmark)

export default landmarkRouter
