import { Router } from 'express'
import dormRouter from './dorms.js'
import landmarkRouter from './landmarks.js'
import cors from 'cors'

const webRouter = Router()

webRouter.use(
  cors({
    origin: 'http://localhost:3000',
  }),
)
webRouter.use('/dorm', dormRouter)
webRouter.use('/', landmarkRouter)

export default webRouter
