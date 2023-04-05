import { z } from 'zod'
import {
  Email,
  FirstName,
  LastName,
  Password,
  UserName,
  UserType,
} from './user'

export const RegisterRequest = z.object({
  userType: UserType,
  email: Email,
  password: Password,
  firstName: FirstName,
  lastName: LastName,
  username: UserName,
})

export const LoginRequest = z.object({
  email: Email,
  password: Password,
})
