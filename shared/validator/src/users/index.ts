import { z } from 'zod'
export {}
export const zLogin = () =>
  z.object({
    username: z.string().max(30).or(z.string().email()),
    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, 'dsfsdfs'),
  })
export const zRegister = () =>
  z
    .object({
      username: z.string().max(30),
      password: z
        .string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, 'dsfsdfs'),
      confirm: z
        .string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, 'dsfsdfs'),
      firstname: z
        .string()
        .regex(/^[ก-๙เะ-์A-Za-z\s'-]+$/)
        .max(50),
      lastname: z
        .string()
        .max(50)
        .regex(/^[ก-๙เะ-์A-Za-z\s'-]+$/),
      email: z.string().email(),
      role: z.enum(['USER', 'DORM_OWNER']),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ['confirm'],
    })
