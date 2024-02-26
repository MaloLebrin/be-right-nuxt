import type { BaseStripeEntity } from '~/types/Stripe'

export interface StripeCustomer extends BaseStripeEntity {
  object: 'customer'
  email: string
  name: string | null
}
