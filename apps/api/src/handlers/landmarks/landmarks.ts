import { RequestHandler } from 'express'
import 

export const getUniversities: RequestHandler = (req, res) => {}

export const getLandmarks: RequestHandler = (req, res) => {}

export const getSpecificLandmark: RequestHandler<{ landmarkId: string }> = (
  req,
  res,
) => {
  const { landmarkId } = req.params
  
}
