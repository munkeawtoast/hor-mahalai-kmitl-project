import { z } from 'zod'

export const userRegister = () =>
  z.object({
    username: z.string().max(30),
    password: z.string().max(20),
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    role: z.enum(['USER', 'DORM_OWNER']),
  })
