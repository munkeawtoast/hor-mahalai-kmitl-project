import { RequestHandler } from 'express'

export const getUniversities: RequestHandler = (req, res) => {}

export const getLandmarks: RequestHandler = (req, res) => {}

export const getSpecificLandmark: RequestHandler<{ landmarkId: string }> = (
  req,
  res,
) => {}
