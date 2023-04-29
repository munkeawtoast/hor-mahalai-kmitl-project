import { Router } from 'express'

const homeRoute = Router()

homeRoute
  .route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!')
  })
  .all((req, res) => {
    res.status(405).send('Method not allowed')
  })

export default homeRoute
