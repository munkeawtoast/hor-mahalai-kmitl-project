import { Router } from 'express'
import dormRouter from './dorms.js'
import landmarkRouter from './landmarks.js'
import universityRouter from './universities.js'
import userRounter from './users.js'
import cors from 'cors'

const webRouter = Router()

webRouter.use(
  cors({
    origin: 'http://localhost:3000',
  }),
)
webRouter.use('/dorms', dormRouter)
webRouter.use('/landmarks', landmarkRouter)
webRouter.use('/universities', universityRouter)
webRouter.use('/users', userRounter)

export default webRouter