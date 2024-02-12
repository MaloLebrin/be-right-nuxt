import { defineStore } from 'pinia'
import { createGetters } from '@malolebrin/pinia-entity-store'
import { productState } from './state'
import type { Product } from '~/types'

export const useProductStore = defineStore('stripeProduct', {
  state: () => ({ ...productState }),
  getters: {
    // getters common to all entities
    ...createGetters<Product>(productState),
  },
})
