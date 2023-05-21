import { z } from 'zod'

export const roomAccomodations = [
  { id: 1, label: 'แอร์' },
  { id: 2, label: 'ห้องน้ำเดี่ยว' },
  { id: 3, label: 'เตียง' },
  { id: 4, label: 'โต๊ะ' },
  { id: 5, label: 'พัดลม' },
  { id: 6, label: 'ตู้เย็น' },
  { id: 7, label: 'พื่นที่ครัว' },
  { id: 8, label: 'ไมโครเวฟ' },
  { id: 9, label: 'ทีวี' },
  { id: 10, label: 'ตู้เสื้อผ้า' },
  { id: 11, label: 'เครื่องทำน้ำอุ่น' },
  { id: 12, label: 'ไวไฟ' },
  { id: 13, label: 'ระเบียง' },
]

export const dormAccommodations = [
  { id: 14, label: 'ตู้กดน้ำ' },
  { id: 15, label: 'เครื่องซักผ้า' },
  { id: 16, label: 'กล้องวงจรปิด' },
  { id: 17, label: 'ที่จอดรถ' },
  { id: 18, label: 'ที่จอดมอเตอร์ไซค์' },
  { id: 19, label: 'ฟิตเนส' },
  { id: 20, label: 'ร้านสะดวกซื้อใกล้หอ' },
]

type ValidatorConfig = {
  coerce?: true
}

const room = (config: ValidatorConfig = {}) =>
  z.object({
    name: z
      .string({ required_error: 'กรุณากรอกชื่อห้อง' })
      .min(3, 'ชื่อห้องสั้นเกินไป')
      .max(30, 'ชื่อประเภทห้องต้องสั่นกว่า 30 ตัวอักษร'),
    accomodations: z
      .object({
        id: z.number(),
        value: z.boolean({ coerce: config.coerce }),
      })
      .array(),
    width: z
      .number({ coerce: config.coerce })
      .positive('ความกว้างต้องมากกว่า 0'),
    length: z
      .number({ coerce: config.coerce })
      .positive('ความยาวต้องมากกว่า 0'),
    price: z.number({ coerce: config.coerce }).positive('ราคาต้องไม่ต่ำกว่า 0'),
  })

export const zPostDorm = (config: ValidatorConfig = {}) =>
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
    lat: z
      .number({
        coerce: config.coerce,
        required_error: 'กรุณาเลือกตำแหน่งในแผนที่',
      })
      .min(-85)
      .max(85)
      .refine(val => val !== 0, { message: 'กรุณากรอกตำแหน่งในแผนที่' }),
    lng: z
      .number({ coerce: config.coerce, required_error: '' })
      .min(-180)
      .max(180),
    contacts: z.object({
      telnum: z
        .string({ required_error: 'กรุณากรอกเบอร์ติดต่อ' })
        .min(9, 'เบอร์ติดต่อสั้นเกินไป')
        .max(10, 'เบอร์ติดต่อยาวเกินไป'),
      facebook: z.union([z.string().url(), z.literal('')]),
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
      .number({ coerce: config.coerce, required_error: 'ต้องมีจุดมาร์ค' })
      .int('ไอดีจุดต้องเป็น integer'),
    rooms: room(config)
      .array()
      .nonempty('ต้องมีประเภทห้องอย่างน้อยหนึ่งห้อง')
      .max(100, 'ห้องเยอะเกินไป'),
    accomodations: z
      .object({
        id: z.number(),
        value: z.boolean({ coerce: config.coerce }),
      })
      .array(),
  })

export const zPostRoom = (config: ValidatorConfig = {}) => room(config)

export const zPatchDorm = (config: ValidatorConfig = {}) =>
  zPostDorm({ coerce: config.coerce })
    .omit({
      rooms: true,
    })
    .extend({
      dormid: z.number(),
      rooms: room()
        .extend({ id: z.number({ coerce: config.coerce }).int().nullable() })
        .array(),
    })

export const zPatchRoom = () => room().partial()
