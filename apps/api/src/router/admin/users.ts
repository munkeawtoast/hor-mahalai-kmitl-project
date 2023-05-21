import Router from 'express'
import { putUser, postUserRegister } from '~handlers/auth/register.js'
import { postUserLogin } from '~handlers/auth/login.js'
import {
  imageUploadBuilder,
} from '~middlewares/supabaseUserUpload.js'
import { checkAuth } from '~middlewares/auth.js'

const userRounter = Router()
userRounter.post('/login', postUserLogin)
userRounter.patch(
  '/',
  checkAuth,
  imageUploadBuilder({ fieldName: 'uploadImage', type: 'single' }),
  putUser,
)

export default userRounter
