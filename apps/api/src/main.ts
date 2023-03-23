import router from './routers'
import * as express from 'express'

const PORT = process.env.PORT || 3000

const app = express()

app.use('/', router)

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
