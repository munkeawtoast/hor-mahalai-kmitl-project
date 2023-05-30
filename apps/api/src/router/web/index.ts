import { Router } from 'express'
import dormRouter from './dorms.js'
import universityRouter from './universities.js'
import userRounter from './users.js'
import cors from 'cors'
import ticketsRounter from './tickets.js'

const webRouter = Router()

webRouter.use(cors())
webRouter.use('/dorms', dormRouter)
webRouter.use('/universities', universityRouter)
webRouter.use('/users', userRounter)
webRouter.use('/tickets', ticketsRounter)
webRouter.use((err, req, res, next) => {
  console.log('This is the invalid field ->', err.field)
  next(err)
})
export default webRouter
