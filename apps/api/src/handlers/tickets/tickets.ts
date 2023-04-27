import { RequestHandler } from 'express'

export const getTickets: RequestHandler = (req, res) => {}

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
