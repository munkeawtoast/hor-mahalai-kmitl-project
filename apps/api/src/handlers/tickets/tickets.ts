import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'

// import { zPostDorm, zPatchDorm } from '@shared/validator'
// import { Request as JwtRequest } from 'express-jwt'

const prisma = new PrismaClient()

export const getTickets: RequestHandler = async (req, res) => {
  const ticketResult = await prisma.ticket.findMany({
    orderBy: [{ ticketID: 'asc' }],
  })
  res.json(ticketResult)
}

export const getSpecificTicket: RequestHandler<{ ticketId: string }> = (
  req,
  res,
) => {}

export const postTicket: RequestHandler = (req, res) => {}

export const deleteTicket: RequestHandler<{ ticketId: string }> = (
  req,
  res,
) => {}

export const patchTicket: RequestHandler<{ ticketId: string }> = (
  req,
  res,
) => {}

export const patchTicketStatus: RequestHandler<{ ticketId: string }> = (
  req,
  res,
) => {}
