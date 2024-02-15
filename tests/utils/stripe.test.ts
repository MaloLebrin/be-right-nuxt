import { describe, expect, test } from 'vitest'
import {
  getUnitPrice,
} from '../../utils/stripe'
import type { ProductWithPrice } from '~/types'

describe('getUnitPrice', () => {
  test('should return null if array is empty', () => {
    expect(getUnitPrice([])).toBeUndefined()
  })

  test('should return null if array is undefined', () => {
    expect(getUnitPrice(undefined as unknown as any[])).toBeUndefined()
  })

  test('should return null if array is null', () => {
    expect(getUnitPrice(null as unknown as any[])).toBeUndefined()
  })

  test('should return undefined if product not found', () => {
    expect(getUnitPrice([
      {
        id: 'prod_1',
        name: 'Product 1',
        default_price: {
          id: 'price_1',
          unit_amount: 1000,
        },
      },
      {
        id: 'prod_2',
        name: 'Product 2',
        default_price: {
          id: 'price_2',
          unit_amount: 2000,
        },
      },
    ] as ProductWithPrice[])).toBeUndefined()
  })

  test('should return the unit price', () => {
    expect(getUnitPrice([
      {
        id: 'prod_1',
        name: 'Product 1',
        default_price: {
          id: 'price_1',
          unit_amount: 1000,
        },
        metadata: {
          apiType: 'UNIT',
        },
      },
      {
        id: 'prod_2',
        name: 'Product 2',
        default_price: {
          id: 'price_2',
          unit_amount: 2000,
        },
      },
    ] as ProductWithPrice[])).toBe(1000)
  })
})
