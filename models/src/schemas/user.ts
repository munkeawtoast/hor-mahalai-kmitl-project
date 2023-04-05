import { z } from 'zod'
import { DormId } from './dorm'

export const UserType = z.enum(['student', 'dorm_owner'])
export const UserId = z.number().min(-1).max(999999)
export const FirstName = z.string().min(2).max(50)
export const LastName = z.string().min(2).max(50)
export const UserName = z.string().min(2).max(20)
export const Email = z.string().email().min(3).max(50)
export const Password = z.string().min(8).max(20)

const User = z.object({
  id: UserId,
  email: Email,
  username: UserName,
  firstName: FirstName,
  lastName: LastName,
  profilePicture: z.string().url().optional(),
  userType: UserType,
  dorms: DormId.array().optional(),
})

const UserRequest = z.object({
  id: UserId,
})

export const UserResponse = User
