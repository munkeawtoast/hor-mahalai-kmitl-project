import express from 'express'
import homeRoute from './routes/home.js'
import dormRoute from './routes/dorm.js'
import ticketRoute from './routes/ticket.js'
import { checkAuth } from 'middlewares/auth.js'
import { expressjwt as jwt } from 'express-jwt'

const app = express()

const PORT = process.env.PORT || 3000
app.use(
  jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
  }),
)

app.use('/', homeRoute)
// app.use('/dorms', dormRoute)
app.use('/tickets', ticketRoute)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`)
})
