import { z } from 'zod'
import { DormRequest } from './dorm'
import { Description, Title } from './format'
import { UserId } from './user'

const GenericTicketType = z.enum(['web', 'other'])
const BaseTicket = z.object({
  author: UserId,
  title: Title,
  type: GenericTicketType,
  description: Description,
})

export const GeneralTicketRequest = BaseTicket.strict()
export const UserTicketRequest = BaseTicket.extend({
  reportTargetId: UserId,
}).strict()
export const TicketRequest = BaseTicket.strict()
export const DormTicketRequest = BaseTicket.extend({
  dorm: DormRequest,
  type: z.literal('dorm-add'),
}).strict()

export const GeneralTicketResponse = BaseTicket.extend({
  id: z.number().int().positive().max(999999),
  createdAt: z.date(),
  updatedAt: z.date(),
})
export const UserTicketResponse = BaseTicket.extend({
  reportedUserId: z.number().int().positive().max(999999),
  createdAt: z.date(),
  updatedAt: z.date(),
})
export const TicketResponse = BaseTicket.extend({
  id: z.number().int().positive().max(999999),
  createdAt: z.date(),
  updatedAt: z.date(),
})
export const DormTicketResponse = BaseTicket.extend({
  id: z.number().int().positive().max(999999),
  createdAt: z.date(),
  updatedAt: z.date(),
  dorm: DormRequest,
})
