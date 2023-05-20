import Router from 'express'
import { getTickets, postTicket } from '~handlers/tickets/index.js'

const ticketsRounter = Router()

ticketsRounter.get('/', getTickets)
ticketsRounter.post('/', postTicket)

export default ticketsRounter
