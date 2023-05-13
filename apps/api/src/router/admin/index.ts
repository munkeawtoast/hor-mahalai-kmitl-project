import { Router } from 'express'
import cors from 'cors'

const adminRouter = Router()

adminRouter.use(
  cors({
    origin: 'http://localhost:4000',
  }),
)
export default adminRouter
