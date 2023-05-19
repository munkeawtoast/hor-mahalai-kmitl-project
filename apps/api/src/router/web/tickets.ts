import Router from 'express'
import { getTickets } from '~handlers/tickets/index.js'

const ticketsRounter = Router()

ticketsRounter.get('/', getTickets)

export default ticketsRounter
