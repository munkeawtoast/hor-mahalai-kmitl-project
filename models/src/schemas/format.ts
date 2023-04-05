import { z } from 'zod'

export const Title = z.string().min(3).max(30)
export const Markdown = z.string().min(3).max(3000)
export const Description = z.string().min(3).max(1000)
export const Name = z.string().min(3).max(20)
export const ImageUrl = z.string().url()
