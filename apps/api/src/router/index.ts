import { Router } from 'express'
import { helloworld } from './helloworld.js'

const router = Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params
  res.json({
    message: `Hello ${id}!`,
  })
})

router.get('/', helloworld)

router.post('/test', (req, res) => {
  console.log(req.body)
  res.json({
    message: 'Hello World!',
  })
})

router.delete('/test', (req, res) => {
  console.log(req.body)
  res.json({
    // message: 'DELETE!',
    anotherMessage: 'SOMETHING ELSE',
    ...req.body
  })
})
export default router
