import { defineStore } from 'pinia'
import { createGetters } from '@malolebrin/pinia-entity-store'
import { customerState } from './state'
import type { StripeCustomer } from '~/types'

export const useCustomerStore = defineStore('stripeCustomer', {
  state: () => ({ ...customerState }),
  getters: {
    // getters common to all entities
    ...createGetters<StripeCustomer>(customerState),
  },
  actions: {
    addOne(customer: StripeCustomer) {
      if (!noNullUndefined(this.entities.byId[customer.id])) {
        this.entities.allIds.push(customer.id)
      }
      this.entities.byId[customer.id] = { ...customer, $isDirty: false }
    },
  },
})
