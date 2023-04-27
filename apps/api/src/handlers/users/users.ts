import { RequestHandler } from 'express'

export const getUserDorms: RequestHandler = (req, res) => {}

export const getUserDetails: RequestHandler<{ userId: string }> = (
  req,
  res,
) => {}

export const getSelfDetails: RequestHandler = (req, res) => {}
