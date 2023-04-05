import { z } from 'zod'
import { Description, Name } from './format'
import { UserId } from './user'

export const DormId = z.number().int().positive().max(99999)
export const Price = z.number().positive().step(1)
export const dormAccommodations = [
  'water-refill',
  'laundry',
  'cctv',
  'car-parking',
  'motorcycle-parking',
  'gym',
  'nearby-shop',
]
export const roomAccomodations = [
  'ac',
  'bath',
  'bed',
  'desk',
  'fan',
  'fridge',
  'kitchen',
  'microwave',
  'tv',
  'wardrobe',
  'water-heater',
  'wifi',
]

const BooleanAccomodation = z.object({
  name: z.string(),
  type: z.literal('boolean'),
  value: z.boolean(),
})
const CountAccomodation = z.object({
  name: z.string(),
  type: z.literal('number'),
  value: z.number(),
})

export const Accomodation = z.discriminatedUnion('type', [
  BooleanAccomodation,
  CountAccomodation,
])

const DormAccomodations = z.object({
  waterRefill: z.boolean(),
  laundry: z.boolean(),
  cctv: z.boolean(),
  carParking: z.boolean(),
  motorcycleParking: z.boolean(),
  gym: z.boolean(),
  nearbyShop: z.boolean(),
})

const RoomAccommodations = z.

// Room ยังไม่รู้ว่าควรแยก request กับ response มั้ย
const Room = z.object({
  name: Name,
  price: Price,
  accommodations: RoomAccommodations,
})

const Dorm = z.object({
  name: Name,
  address: z.string().min(3).max(100),
  lat: z.number().min(-85).max(85),
  lng: z.number().min(-180).max(180),
  rooms: Room.array(),
  accommodations: DormAccomodations,
})

export const DormRequest = Dorm
export const DormResponse = Dorm.extend({
  id: DormId,
  createdAt: z.date(),
  updatedAt: z.date(),
})

const DormComment = z.object({
  content: Description,
  userId: UserId,
})

export const DormCommentRequest = DormComment.strict()
export const DormCommentResponse = DormComment.extend({
  id: z.number().int().positive().max(999999),
  createdAt: z.date(),
  updatedAt: z.date(),
})
