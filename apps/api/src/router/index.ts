import { Router } from 'express'
import { helloworld } from '../routes'

const router = Router()

router.get('/', helloworld.helloworld)

export default router
