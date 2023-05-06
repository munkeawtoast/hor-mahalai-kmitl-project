import { Router } from "express"
import { getDormsByLandmark } from "~handlers/dorms"

const landmarkRouter = Router()

landmarkRouter.get('/:landmark/', getDormsByLandmark)

export default landmarkRouter
