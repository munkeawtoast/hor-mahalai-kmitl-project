import { Router } from 'express'
import helloworldRouter from './helloworld.js'

const router = Router()

router.use('/helloworld', helloworldRouter)

export default router
