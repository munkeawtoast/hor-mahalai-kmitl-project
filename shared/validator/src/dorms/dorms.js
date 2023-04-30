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
  'ร้านสะดวกซื้อใกล้',
]

const Room = z.object({
  name: z
    .string({ required_error: 'กรุณากรอกชื่อห้อง' })
    .min(3, 'ชื่อห้องสั้นเกินไป')
    .max(30, 'ชื่อประเภทห้องต้องสั่นกว่า 30 ตัวอักษร'),
  accomodations: z
    .object({
      name: z.string(),
      value: z.boolean(),
    })
    .array(),
})

export const zPostDorm = z.object({
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
  latitude: z.number().min(-85).max(85),
  longitude: z.number().min(-180).max(180),
  landmark: z
    .number({ required_error: 'ต้องมีจุดมาร์ค' })
    .int('ไอดีจุดต้องเป็็น integer'),
  rooms: Room.array()
    .nonempty('ต้องมีประเภทห้องอย่างน้อยหนึ่งห้อง')
    .max(100, 'ห้องเยอะเกินไป'),
  accomodations: z
    .object({
      name: z.string(),
      value: z.boolean(),
    })
    .array(),
})

export const zPatchDorm = zPostDorm
  .omit({
    rooms: true,
  })
  .partial()

export const zPatchRoom = Room.partial()
