import { generateHash } from '../../utils/userHelper'
import { prismaClient } from '../../database/client'

export async function login({ email, password }: { email: string; password: string }) {
  const user = await prismaClient.user_entity.findFirstOrThrow({
    where: {
      email,
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      firstName: true,
      lastName: true,
      password: true,
      salt: true,
      email: true,
      token: true,
      roles: true,
    },
  })

  const passwordHashed = generateHash(user.salt, password)

  if (user.password !== passwordHashed) {
    // TODO create error sender
    throw createError('Identifiant et/ou mot de passe incorrect')
  }

  return prismaClient.user_entity.findFirst({
    where: { email },
    include: {
      session_entity: true,
      notification_subcription_entity: true,
      company_entity: {
        include: {
          event_entity: true,
          employee_entity: true,
          group_entity: true,
          subscription_entity: true,
          address_entity: true,
        },
      },
    },
  })
}
