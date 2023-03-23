import { Router } from 'express'

const homeRouter = Router()

homeRouter
  .route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!')
  })
  .all((req, res) => {
    res.status(405).send('Method not allowed')
  })

export default homeRouter
