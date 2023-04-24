import { Router } from 'express'
import { helloworld } from './helloworld.js'

const router = Router()

router.get('/', helloworld)

export default router
