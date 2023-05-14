import Router from 'express'
import { postUserRegister } from '~handlers/auth/register.js'
import { postUserLogin } from '~handlers/auth/login.js'

const userRounter = Router()
userRounter.post('/login', postUserLogin)
userRounter.post('/register', postUserRegister)
export default userRounter
