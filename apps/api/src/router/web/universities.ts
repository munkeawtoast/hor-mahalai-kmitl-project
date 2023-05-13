import Router from 'express'

const universityRouter = Router()

const testUnis = [
  {
    id: 0,
  },
]

universityRouter.get('/', (req, res) => {
  res.status(200).json(testUnis)
})
universityRouter.get('/:id', (req, res) => {
  res.status(200).json(testUnis.find((a) => a.id === Number(req.params.id)))
})
