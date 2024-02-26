import { describe, expect, test } from 'vitest'
import {
  getUnitPrice,
  toCent,
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

describe('fromCent', () => {
  test('should convert units to cents', () => {
    expect(fromCent(1000)).toBe(10)
  })

  test('should throw an error if amount is not a number', () => {
    expect(() => fromCent('1000' as unknown as number)).toThrow('Invalid amount')
  })
})

describe('toCent', () => {
  test('should convert cents to unit', () => {
    expect(toCent(10)).toBe(1000)
  })

  test('should throw an error if amount is not a number', () => {
    expect(() => toCent('1000' as unknown as number)).toThrow('Invalid amount')
  })
})
