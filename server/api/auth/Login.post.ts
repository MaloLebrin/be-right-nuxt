import type { UserWithCompany } from 'types/entities/User'
import { generateHash } from '../../utils/userHelper'
import { UserRepository } from '../../database/client'

export default defineEventHandler(async event => {
  const { email, password } = await readBody<{ email: string; password: string }>(event)

  if (!email || !password) {
    return sendError(event, createError({ statusCode: 422, message: 'Paramètres manquants' }))
  }

  const user = await UserRepository.findFirstOrThrow({
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
    return sendError(event, createError({ statusCode: 401, message: 'Email ou mot de passe invalide' }))
  }

  const userToSend = await UserRepository.findFirst({
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
