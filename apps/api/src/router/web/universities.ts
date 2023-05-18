import Router from 'express'
import { getUniversityIdLandmarks, getUniversities } from '~handlers/landmarks/landmarks.js'

const universityRouter = Router()

universityRouter.get('/', getUniversities) 
universityRouter.get('/:landmarkId', getUniversityIdLandmarks)

export default universityRouter
