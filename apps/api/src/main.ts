import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv'

import router from './router/index.js'

import { loggerProvider } from './middlewares/index.js'

import { Env } from './env.js'

dotenv.config()
const env = process.env as Env

const app = express()
const PORT = env.API_PORT || 4000

app.use(loggerProvider)
app.use(json, urlencoded({ extended: true }))
app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
