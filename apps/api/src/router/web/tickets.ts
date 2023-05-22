import Router from 'express'
import { getTickets, postTicket } from '~handlers/tickets/index.js'
import { checkAuth } from '~middlewares/auth.js'

const ticketsRounter = Router()

ticketsRounter.get('/', getTickets)
ticketsRounter.post('/', checkAuth, postTicket)

export default ticketsRounter
