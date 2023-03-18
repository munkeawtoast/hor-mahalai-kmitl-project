import { z } from 'zod'

export const TitleSchema = z.string().min(3).max(30)
export const MarkdownSchema = z.string().min(3).max(3000)
export const DescriptionSchema = z.string().min(3).max(1000)
export const NameSchema = z.string().min(3).max(20)
export const ImageUrlSchema = z.string().url()
