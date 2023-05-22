import { RequestHandler } from 'express'
import { PrismaClient } from '@prisma/client'
import { zPostTicket } from '@shared/validator'
import { Request as JwtRequest } from 'express-jwt'

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

export const postTicket: RequestHandler = async (req: JwtRequest, res) => {
  const parseResult = zPostTicket().safeParse(req.body)
  if (!parseResult.success) return res.status(400).send(parseResult.error)
  if (!req.auth) return res.status(401).json({ error: 'bad' })
  const ticketData = parseResult.data
  const dormResult = await prisma.ticket.create({
    data: {
      title: ticketData.title,
      description: ticketData.description,
      TicketCategory: ticketData.ticketcategory,
      userID: Number(req.auth.sub),
    },
  })
}

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
