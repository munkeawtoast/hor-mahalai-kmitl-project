import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

await prisma.landmark.deleteMany()
const university = await prisma.landmark.create({
  data: {
    Name: 'kmitl',
    Landmarks: {
      createMany: {
        data: [
          {
            Name: 'jinda',
          },
          {
            Name: 'gay',
          },
          {
            Name: 'savanna',
          },
        ],
      },
    },
  },
  include: {
    Landmarks: true,
  },
})
