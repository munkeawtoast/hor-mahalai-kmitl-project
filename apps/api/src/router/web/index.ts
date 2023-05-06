import { Router } from 'express'
import dormRouter from './dorms.js'
import landmarkRouter from './landmarks.js'

const webRouter = Router()

webRouter.use('/dorm', dormRouter)
webRouter.use('/', landmarkRouter)


export default webRouter
