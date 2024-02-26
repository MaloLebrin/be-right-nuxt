import { createState } from '@malolebrin/pinia-entity-store'
import type { ProductWithPrice } from '~/types'

export const productState = createState<ProductWithPrice>()

export function defaultProductState() {
  return createState<ProductWithPrice>()
}
