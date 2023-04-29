import { Router } from 'express'

const dormRoute = Router()

// query Dorms
dormRoute.get('/', (req, res) => {
  res.status(200).send('Dorms')
})

//
dormRoute.post('/', (req, res) => {

})


export default dormRoute
