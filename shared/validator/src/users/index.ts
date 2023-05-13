import { z } from 'zod'
export {}
export const zLogin = () =>
  z.object({
    username: z.string().max(30).or(z.string().email()),
    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, 'dsfsdfs'),
  })
export const zRegister = () =>
  z.object({
    username: z.string().max(30),
    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, 'dsfsdfs'),
    firstname: z.string().max(50),
    lastname: z
      .string()
      .max(50)
      .regex(/^[\p{L}เ\s'-]+$/),
  })
