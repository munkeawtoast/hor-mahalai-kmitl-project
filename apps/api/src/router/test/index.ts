import { Router } from 'express'
import helloworldRouter from './helloworld.js'

const testRouter = Router()

testRouter.use('/helloworld', helloworldRouter)

export default testRouter
