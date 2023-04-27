import { RequestHandler } from 'express'

export const getDorms: RequestHandler = (req, res) => {}

export const getSpecificDorm: RequestHandler<{ dormId: string }> = (
  req,
  res,
) => {}

export const postDorm: RequestHandler = (req, res) => {}

export const deleteDorm: RequestHandler<{ dormId: string }> = (req, res) => {}

export const patchDorm: RequestHandler<{ dormId: string }> = (req, res) => {}

export const patchApproveDorm: RequestHandler<{ dormId: string }> = (
  req,
  res,
) => {}
