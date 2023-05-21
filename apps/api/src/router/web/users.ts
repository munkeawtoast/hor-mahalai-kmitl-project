import Router from 'express'
import { patchUser, postUserRegister } from '~handlers/auth/register.js'
import { postUserLogin } from '~handlers/auth/login.js'
import {
  imageUploadBuilder,
  multerUpload,
} from '~middlewares/supabaseUserUpload.js'
import { checkAuth } from '~middlewares/auth.js'

const userRounter = Router()
userRounter.post('/login', postUserLogin)
userRounter.post('/register', postUserRegister)
userRounter.patch(
  '/',
  checkAuth,
  imageUploadBuilder({ fieldName: 'uploadImage', type: 'single' }),
  patchUser,
)
// userRounter.post('/profile', multerUpload.,  (req, res) => {
//   req.uploadedURL
//   const { file } = req
//   if (!file) return
//   file.buffer
// })

export default userRounter
