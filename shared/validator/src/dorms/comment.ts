import { z } from 'zod'

export const zPostComment = () =>
  z.object({
    description: z
      .string({ required_error: 'กรุณากรอกคอมเม้นก่อนส่ง' })
      .max(255, 'คอมเม้นยาวเกินไป'),
  })
