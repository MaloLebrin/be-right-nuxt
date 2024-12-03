import type { ProductWithPrice } from '~/types'

export function getUnitPrice(products: ProductWithPrice[] | null): number | undefined {
  if (!products || products.length === 0) {
    return undefined
  }
  return getPrice(products)?.default_price?.unit_amount
}

export function getPrice(products: ProductWithPrice[] | null): ProductWithPrice | undefined {
  if (!products || products.length === 0) {
    return undefined
  }
  return products.find(product => {
    return product.metadata?.apiType === 'UNIT'
  })
}

export function fromCent(amount: number): number {
  if (!amount || typeof amount !== 'number') {
    throw new Error('Invalid amount')
  }
  return amount / 100
}

export function toCent(amount: number): number {
  if (!amount || typeof amount !== 'number') {
    throw new Error('Invalid amount')
  }
  return amount * 100
}
