import express from 'express'
import dotenv from 'dotenv'

import router from './router'

import { loggerProvider } from './middlewares'
import { Env } from 'types.js'

dotenv.config()
const env = process.env as Env

const app = express()
const PORT = env.API_PORT || 4000

app.use(loggerProvider)
app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app