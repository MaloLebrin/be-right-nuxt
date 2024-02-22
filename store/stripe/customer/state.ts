import { createState } from '@malolebrin/pinia-entity-store'
import type { StripeCustomer } from '~/types'

export const customerState = createState<StripeCustomer>()

export function defaultCustomerState() {
  return createState<StripeCustomer>()
}
