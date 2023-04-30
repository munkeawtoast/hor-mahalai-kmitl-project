import express, { json, urlencoded } from 'express'
import multer from 'multer'
import dotenv from 'dotenv'

import webRouter from '~router/web/index.js'
import testRouter from '~router/test/index.js'
import adminRouter from '~router/admin/index.js'

import { loggerProvider } from './middlewares/index.js'

import { Env } from './global-types.js'

dotenv.config()
const env = process.env as Env

const app = express()
const PORT = env.API_PORT || 4000

app.use(loggerProvider)
app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/web', webRouter)
app.use('/test', testRouter)
app.use('/admin', adminRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
