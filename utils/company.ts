import { hasOwnProperty } from '@antfu/utils'
import type { Company } from '~/store/company/types'

export function isCompanyType(arg: any): arg is Company {
  return hasOwnProperty(arg, 'subscriptionLabel')
    && hasOwnProperty(arg, 'siret')
    && hasOwnProperty(arg, 'name')
    && hasOwnProperty(arg, 'subscriptionId')
}

export function areCompaniesTypes(args: unknown[]): args is Company[] {
  return args.every(arg => isCompanyType(arg))
}
