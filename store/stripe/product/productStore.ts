import { defineStore } from 'pinia'
import { createGetters } from '@malolebrin/pinia-entity-store'
import { productState } from './state'
import type { ProductWithPrice } from '~/types'

export const useProductStore = defineStore('stripeProduct', {
  state: () => ({ ...productState }),
  getters: {
    // getters common to all entities
    ...createGetters<ProductWithPrice>(productState),
  },
  actions: {
    addMany(products: ProductWithPrice[]) {
      products.forEach(product => {
        if (!noNullUndefined(this.entities.byId[product.id])) {
          this.entities.allIds.push(product.id)
        }
        this.entities.byId[product.id] = { ...product, $isDirty: false }
      })
    },
  },
})
