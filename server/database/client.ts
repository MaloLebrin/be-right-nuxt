import { PrismaClient } from '@prisma/client'

export const prismaClient = new PrismaClient()

export const UserRepository = prismaClient.user_entity
