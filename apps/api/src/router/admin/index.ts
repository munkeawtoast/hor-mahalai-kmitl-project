import { Router } from 'express'
import cors from 'cors'
import dormRouter from '~router/web/dorms.js'
import ticketRouter from '~router/web/tickets.js'

const adminRouter = Router()

adminRouter.use(cors())
adminRouter.use('/dorms', dormRouter)
adminRouter.use('/tickets', ticketRouter)

export default adminRouter
