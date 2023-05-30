import express, { json, urlencoded } from 'express'
import { getEnv } from '~utils/index.js'

import webRouter from '~router/web/index.js'
import testRouter from '~router/test/index.js'
import adminRouter from '~router/admin/index.js'

import { logger, errorLogger } from '~middlewares/logger.js'

const env = getEnv()

const app = express()
const PORT = env.API_PORT || 4000


app.use(json())
app.use(urlencoded({ extended: true }))

app.use(logger)
app.use(errorLogger)

app.use('/web', webRouter)
app.use('/test', testRouter)
app.use('/admin', adminRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
