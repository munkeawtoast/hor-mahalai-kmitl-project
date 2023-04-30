import { Router } from 'express'
import dormRouter from './dorm.js'

const webRouter = Router()

webRouter.use('/dorm', dormRouter)

export default webRouter