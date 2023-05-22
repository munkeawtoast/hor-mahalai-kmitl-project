import { z } from 'zod'
const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
export {}
export const zLogin = () =>
  z.object({
    username: z.string().max(30).or(z.string().email()),
    password: z
      .string({ required_error: 'กรุณากรอก Password' })
  })
export const zRegister = () =>
  z
    .object({
      username: z.string({ required_error: 'กรุณากรอก Username' }).max(30),
      password: z
        .string({ required_error: 'กรุณากรอก Password' })
        .min(8)
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, 'Password ไม่ถูกต้อง'),
      confirm: z
        .string({ required_error: 'กรุณากรอก Password' })
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, 'Password ไม่ถูกต้อง'),
      firstname: z
        .string({ required_error: 'กรุณากรอกชื่อจริง' })
        .regex(/^[ก-๙เะ-์A-Za-z\s'-]+$/)
        .max(50),
      lastname: z
        .string({ required_error: 'กรุณากรอกนามสกุล' })
        .max(50)
        .regex(/^[ก-๙เะ-์A-Za-z\s'-]+$/),
      email: z.string({ required_error: 'กรุณากรอก Email' }).email(),
      role: z.enum(['USER', 'DORM_OWNER']),
    })
    .refine(data => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ['confirm'],
    })

export const zPatchUser = () =>
  z
    .object({
      username: z.string({ required_error: 'กรุณากรอก Username' }).max(30),
      password: z
        .string({ required_error: 'กรุณากรอก Password' })
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, 'Password ไม่ถูกต้อง'),
      confirm: z
        .string({ required_error: 'กรุณากรอก Password' })
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, 'Password ไม่ถูกต้อง'),
      firstname: z
        .string({ required_error: 'กรุณากรอกชื่อจริง' })
        .regex(/^[ก-๙เะ-์A-Za-z\s'-]+$/)
        .max(50),
      lastname: z
        .string({ required_error: 'กรุณากรอกนามสกุล' })
        .max(50)
        .regex(/^[ก-๙เะ-์A-Za-z\s'-]+$/),
      email: z.string({ required_error: 'กรุณากรอก Email' }).email(),
      // userimage: z
      //   .any()
      //   .refine(files => files?.length == 1, 'Image is required.')
      //   .refine(
      //     files => files?.[0]?.size <= MAX_FILE_SIZE,
      //     `Max file size is 5MB.`,
      //   )
      //   .refine(
      //     files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      //     '.jpg, .jpeg and .png files are accepted.',
      //   ),
    })
    .refine(data => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ['confirm'],
    })
