import type { ProductWithPrice } from '~/types'

export function getUnitPrice(products: ProductWithPrice[]): number | undefined {
  if (!products || products.length === 0) {
    return undefined
  }
  return products.find(product => {
    return product.metadata?.apiType === 'UNIT'
  })?.default_price?.unit_amount
}
