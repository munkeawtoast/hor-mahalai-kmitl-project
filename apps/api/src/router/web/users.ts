import Router from 'express'
import { postUserRegister } from '~handlers/auth/register.js'
import { postUserLogin } from '~handlers/auth/login.js'
import { multerUpload } from '~middlewares/supabaseUserUpload.js'

const userRounter = Router()
userRounter.post('/login', postUserLogin)
userRounter.post('/register', postUserRegister)
// userRounter.post('/profile', multerUpload.,  (req, res) => {
//   req.uploadedURL
//   const { file } = req
//   if (!file) return
//   file.buffer
// })

export default userRounter
