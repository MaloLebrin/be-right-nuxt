import type { company_entity, user_entity } from '@prisma/client'

export type UserWithCompany = user_entity & {
  company_entity: company_entity
}
