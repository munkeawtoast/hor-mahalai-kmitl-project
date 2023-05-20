import { z } from 'zod'

export const zPostTicket = () =>
  z.object({
    title: z
      .string({ required_error: 'กรุณากรอกหัวข้อ Ticket' })
      .max(30, 'หัวข้อยาวเกินไป'),
    description: z
      .string({ required_error: 'กรุณากรอกข้อมูล' })
      .max(3000, 'ข้อมูล ticketยาวเกินไป'),
    ticketcategory: z.enum(['REGISTER', 'LOGIN', 'WEBBUG', 'OTHER', 'DORM']),
  })
