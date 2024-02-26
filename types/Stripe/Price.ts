import type { CurrencyEnum, StripeObjectTypeEnum } from './index'

export interface Price {
  active: boolean
  billing_scheme: string
  created: number
  currency: CurrencyEnum
  custom_unit_amount: null
  id: string
  livemode: boolean
  lookup_key: string | null
  metadata: Record<string, any>
  nickname: string | null
  object: StripeObjectTypeEnum
  product: string
  recurring: null
  tax_behavior: string
  tiers_mode: null
  transform_quantity: null
  type: string
  unit_amount: number
  unit_amount_decimal: string
}
