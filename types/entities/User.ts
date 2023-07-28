import type { company_entity, user_entity } from '@prisma/client'
import type { SubscriptionEnum } from '~~/store'
import type { RoleEnum } from '~~/types/Roles'

export type UserWithCompany = user_entity & {
  company_entity: company_entity
}

export interface JWTTokenPayload {
  email: string
  firstName: string
  lastName: string
  roles: RoleEnum
  subscription?: SubscriptionEnum
}
