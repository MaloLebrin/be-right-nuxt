import { createState } from '@malolebrin/pinia-entity-store'
import type { Product } from '~/types'

export const productState = createState<Product>()

export function defaultProductState() {
  return createState<Product>()
}
