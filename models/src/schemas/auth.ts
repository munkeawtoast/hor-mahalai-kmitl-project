import { z } from 'zod'
import { EmailSchema, FirstNameSchema, LastNameSchema, PasswordSchema, UserNameSchema, UserTypeSchema } from './user'

export const RegisterRequestSchema = z.object({
  userType: UserTypeSchema,
  email: EmailSchema,
  password: PasswordSchema,
  firstName: FirstNameSchema,
  lastName: LastNameSchema,
  username: UserNameSchema,
})

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
})
