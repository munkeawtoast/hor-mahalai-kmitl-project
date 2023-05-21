import { z } from 'zod'
// const MAX_FILE_SIZE = 500000
// const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

// export const userRegister = () =>
//   z.object({
//     username: z.string().max(30),
//     password: z.string().max(20),
//     firstname: z.string(),
//     lastname: z.string(),
//     email: z.string().email(),
//     role: z.enum(['USER', 'DORM_OWNER']),
//   })

// export const zPatchUser = () =>
//   z.object({
//     username: z.string().max(30),
//     password: z.string().max(20),
//     firstname: z.string(),
//     lastname: z.string(),
//     email: z.string().email(),
//     userimage: z
//       .any()
//       .refine(files => files?.length == 1, 'Image is required.')
//       .refine(
//         files => files?.[0]?.size <= MAX_FILE_SIZE,
//         `Max file size is 5MB.`,
//       )
//       .refine(
//         files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
//         '.jpg, .jpeg and .png files are accepted.',
//       ),
//   })
