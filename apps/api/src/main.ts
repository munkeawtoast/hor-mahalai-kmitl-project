import express from 'express'
import dotenv from 'dotenv'

import router from './router/router.js'

import { logger } from './middlewares/index.js'
import { Env } from 'types.js'

dotenv.config()
const env = process.env as Env

const app = express()
const PORT = env.API_PORT || 4000

app.use(logger)
app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
