import { z } from 'zod'

export const roomAccomodations = [
  'แอร์',
  'ห้องน้ำเดี่ยว',
  'เตียง',
  'โต๊ะ',
  'พัดลม',
  'ตู้เย็น',
  'พื่นที่ครัว',
  'ไมโครเวฟ',
  'ทีวี',
  'ตู้เสื้อผ้า',
  'เครื่องทำน้ำอุ่น',
  'ไวไฟ',
  'ระเบียง',
]

export const dormAccommodations = [
  'ตู้กดน้ำ',
  'เครื่องซักผ้า',
  'กล้องวงจรปิด',
  'ที่จอดรถ',
  'ที่จอดมอเตอร์ไซค์',
  'ฟิตเนส',
  'ร้านสะดวกซื้อใกล้หอ',
]

const room = () =>
  z.object({
    name: z
      .string({ required_error: 'กรุณากรอกชื่อห้อง' })
      .min(3, 'ชื่อห้องสั้นเกินไป')
      .max(30, 'ชื่อประเภทห้องต้องสั่นกว่า 30 ตัวอักษร'),
    accomodations: z
      .object({
        name: z.string(),
        value: z.coerce.boolean(),
      })
      .array(),
    width: z.number().positive('ความกว้างต้องมากกว่า 0'),
    length: z.number().positive('ความยาวต้องมากกว่า 0'),
    price: z.number().positive('ราคาต้องไม่ต่ำกว่า 0'),
  })

export const zPostDorm = () =>
  z.object({
    name: z
      .string({ required_error: 'กรุณากรอกชื่อหอ' })
      .min(5, {
        message: 'ชื่อสั้นเกินไป',
      })
      .max(30, { message: 'ชื่อต้องสั้นกว่า 30 ตัวอักษร' }),
    address: z
      .string({ required_error: 'กรุณากรอกที่อยู่' })
      .min(5, 'ที่อยู่สั่นเกินไป')
      .max(120, 'ที่อยู่ต้องสั่นกว่า 120 ตัวอักษร'),
    position: z.tuple(
      [z.number().min(-85).max(85), z.number().min(-180).max(180)],
      { required_error: 'กรุณาเลือกตำแหน่งของหอ' },
    ),
    contacts: z.object({
      telnum: z
        .string({ required_error: 'กรุณากรอกเบอร์ติดต่อ' })
        .min(9, 'เบอร์ติดต่อสั้นเกินไป')
        .max(10, 'เบอร์ติดต่อยาวเกินไป'),
      facebook: z.string().url().nullable(),
      line: z.string().nullable(),
    }),
    description: z
      .string({ required_error: 'กรุณากรอกคำอธิบายหอ' })
      .max(3000, 'คำอธิบายยาวเกินไป'),
    waterrate: z
      .string({ required_error: 'กรุณากรอกค่าน้ำ' })
      .max(100, 'ข้อความยาวเกินไป'),
    electricityrate: z
      .string({ required_error: 'กรุณากรอกค่าไฟ' })
      .max(100, 'ข้อความยาวเกินไป'),
    landmark: z
      .number({ required_error: 'ต้องมีจุดมาร์ค' })
      .int('ไอดีจุดต้องเป็น integer'),
    rooms: room()
      .array()
      .nonempty('ต้องมีประเภทห้องอย่างน้อยหนึ่งห้อง')
      .max(100, 'ห้องเยอะเกินไป'),
    accomodations: z
      .object({
        name: z.string(),
        value: z.coerce.boolean(),
      })
      .array(),
  })

export const zPostRoom = room()

export const zPatchDorm = () =>
  zPostDorm()
    .omit({
      rooms: true,
    })
    .extend({
      dormid: z.number(),
      rooms: room().extend({ id: z.number().int().nullable() }).array(),
    })

export const zPatchRoom = () => room().partial()
