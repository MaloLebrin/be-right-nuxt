import uid2 from 'uid2'
import { createJwtToken } from '../../utils/userHelper'
import { UserRepository } from '../../database/client'
import { RoleEnum, SubscriptionEnum } from '~~/types'
import type { UserWithCompany } from '~~/types/entities/User'

export default defineEventHandler(async event => {
  const {
    email,
    firstName,
    lastName,
    password,
    companyName,
  } = await readBody<{
    email: string
    firstName: string
    lastName: string
    password: string
    companyName: string
  }>(event)

  if (!email || !firstName || !lastName || !password || !companyName) {
    return sendError(event, createError({ statusCode: 422, message: 'Paramètres manquants' }))
  }

  const count = await UserRepository.count({
    where: {
      email,
    },
  })

  if (count > 0) {
    return sendError(event, createError({ statusCode: 423, message: 'Un compte existe déjà avec cette addresse email' }))
  }

  const token = createJwtToken({
    email,
    firstName,
    lastName,
    roles: RoleEnum.OWNER,
    subscription: SubscriptionEnum.BASIC,
  })

  const salt = uid2(128)
  const twoFactorSecret = uid2(128)
  const twoFactorRecoveryCode = generateHash(twoFactorSecret, email)

  if (!token) {
    return sendError(event, createError({ statusCode: 503, message: 'Une erreur s\'est produite' }))
  }

  const user = await UserRepository.create({
    data: {
      email,
      lastName,
      firstName,
      roles: RoleEnum.OWNER,
      salt,
      token,
      twoFactorRecoveryCode,
      twoFactorSecret,
      company_entity: {
        create: {
          name: companyName,
          subscription_entity: {
            create: {
              type: SubscriptionEnum.BASIC,
            },
          },
        },
      },
    },
  })

  const userToSend = await UserRepository.findUnique({
    where: { id: user.id },
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
