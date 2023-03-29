import { Router } from 'express'
import { Request } from 'util/types.js'
import { checkAuth } from '../middlewares/auth.js'

const ticketRoute = Router()

// query Tickets, must be moderator
ticketRoute.get('/', checkAuth, (req: Request, res) => {

})

export default ticketRoute
