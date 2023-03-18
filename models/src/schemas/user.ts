import { z } from 'zod'

export const UserTypeSchema = z.enum(['student', 'dorm_owner'])
export const UserIdSchema = z
  .string()
  .regex(/^(st|do|md)_\d{5}$/)
  .describe('UserID, e.g. st_12345 or do_12345 or md_12345')
export const FirstNameSchema = z.string().min(2).max(30)
export const LastNameSchema = z.string().min(2).max(30)
export const UserNameSchema = z.string().min(2).max(20)
export const EmailSchema = z.string().email()
export const PasswordSchema = z.string().min(8).max(20)

const UserSchema = z.object({
  email: EmailSchema,
  firstName: FirstNameSchema,
  lastName: LastNameSchema,
  profilePicture: z.string().url(),
  userType: z.enum(['student', 'dorm_owner']),
})
