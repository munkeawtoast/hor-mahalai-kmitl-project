import { z } from 'zod'
import { DescriptionSchema, NameSchema } from './format'
import { UserIdSchema } from './user'

export const DormIdSchema = z.number().int().positive().max(99999)
export const PriceSchema = z.number().positive().step(1)

const DormFacilitiesSchema = z.object({
  waterRefill: z.boolean(),
  laundry: z.boolean(),
  cctv: z.boolean(),
  carParking: z.boolean(),
  motorcycleParking: z.boolean(),
  gym: z.boolean(),
  nearbyShop: z.boolean(),
})

const RoomFacilitiesSchema = z.object({
  ac: z.boolean(),
  bath: z.boolean(),
  bed: z.number().positive().int().max(5),
  desk: z.number().positive().int().max(5),
  fan: z.boolean(),
  fridge: z.boolean(),
  kitchen: z.boolean(),
  microwave: z.boolean(),
  tv: z.boolean(),
  wardrobe: z.boolean(),
  waterHeater: z.boolean(),
  wifi: z.boolean(),
})

// Room ยังไม่รู้ว่าควรแยก request กับ response มั้ย
const RoomSchema = z.object({
  name: NameSchema,
  price: PriceSchema,
  facilities: RoomFacilitiesSchema,
})



const DormSchema = z.object({
  name: NameSchema,
  address: z.string().min(3).max(100),
  lat: z.number().min(-85).max(85),
  lng: z.number().min(-180).max(180),
  rooms: RoomSchema.array(),
  facilities: DormFacilitiesSchema,
})

export const DormRequestSchema = DormSchema.strict()
export const DormResponseSchema = DormSchema.extend({
  id: DormIdSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

const DormCommentSchema = z.object({
  content: DescriptionSchema,
  userId: UserIdSchema,
})

export const DormCommentRequestSchema = DormCommentSchema.strict()
export const DormCommentResponseSchema = DormCommentSchema.extend({
  id: z.number().int().positive().max(999999),
  createdAt: z.date(),
  updatedAt: z.date(),
})
