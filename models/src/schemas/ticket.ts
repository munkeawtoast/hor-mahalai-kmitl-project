import { z } from 'zod'
import { DormRequestSchema } from './dorm'
import { DescriptionSchema, TitleSchema } from './format'
import { UserIdSchema } from './user'

const GenericTicketTypeSchema = z.enum(['web', 'other'])

const TicketSchema = z.object({
  author: UserIdSchema,
  title: TitleSchema,
  type: GenericTicketTypeSchema,
  description: DescriptionSchema,
})

export const GeneralTicketRequestSchema = TicketSchema.strict()

export const GeneralTicketResponseSchema = TicketSchema.extend({
  id: z.number().int().positive().max(999999),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const DormTicketRequestSchema = TicketSchema.extend({
  dorm: DormRequestSchema,
  type: z.literal('dorm-add'),
}).strict()

export const DormTicketResponseSchema = TicketSchema.extend({
  id: z.number().int().positive().max(999999),
  createdAt: z.date(),
  updatedAt: z.date(),
  dorm: DormRequestSchema,
})

export const UserTicketRequestSchema = TicketSchema.extend({
  reportTargetId: UserIdSchema,
}).strict()

export const UserTicketResponseSchema = TicketSchema.extend({
  reportedUserId: z.number().int().positive().max(999999),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const TicketRequestSchema = TicketSchema.strict()

export const TicketResponseSchema = TicketSchema.extend({
  id: z.number().int().positive().max(999999),
  createdAt: z.date(),
  updatedAt: z.date(),
})
