import { Router } from 'express'
import helloworldRouter from './helloworld.js'
import cors from 'cors'

const testRouter = Router()
testRouter.use(cors())
testRouter.use('/helloworld', helloworldRouter)

export default testRouter
