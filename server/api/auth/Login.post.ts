import type { UserWithCompany } from 'types/entities/User'
import { generateHash } from '../../utils/userHelper'
import { prismaClient } from '../../database/client'

export default defineEventHandler(async event => {
  const { email, password } = await readBody<{ email: string; password: string }>(event)

  if (!email || !password) {
    throw createError('missings parameters')
  }
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

  const userToSend = await prismaClient.user_entity.findFirst({
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

  const { company_entity } = userToSend as unknown as UserWithCompany

  return {
    user: userToSend,
    company: company_entity,
  }
})
