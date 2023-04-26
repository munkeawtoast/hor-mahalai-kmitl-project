import express, { json, urlencoded } from 'express'
import multer from 'multer'
import dotenv from 'dotenv'

import router from './router/index.js'

import { loggerProvider } from './middlewares/index.js'

import { Env } from './global-types.js'

dotenv.config()
const env = process.env as Env

const app = express()
const upload = multer({})
const PORT = env.API_PORT || 4000

app.use(loggerProvider)
app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
