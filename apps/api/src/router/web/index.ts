import { Router } from 'express'
import dormRouter from './dorms.js'
import landmarkRouter from './landmarks.js'
import universityRouter from './universities.js'
const webRouter = Router()

webRouter.use('/dorms', dormRouter)
webRouter.use('/landmarks', landmarkRouter)
webRouter.use('/', landmarkRouter)

export default webRouter
