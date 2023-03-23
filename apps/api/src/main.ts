import router from './routers'
import express from 'express'

const PORT = process.env.PORT || 3000

const app = express()

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
