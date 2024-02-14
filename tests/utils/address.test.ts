import { describe, expect, test } from 'vitest'
import {
  areAddressType,
  isAddressType,
} from '../../utils/address'

describe('areAddressType', () => {
  test('returns true if all args are AddressType', () => {
    const args = [
      {
        addressLine: 'addressLine',
        postalCode: 'postalCode',
        city: 'city',
        country: 'country',
      },
      {
        addressLine: 'addressLine',
        postalCode: 'postalCode',
        city: 'city',
        country: 'country',
      },
    ]
    expect(areAddressType(args)).toBe(true)
  })

  test('returns false if any arg is not AddressType', () => {
    const args = [
      {
        addressLine: 'addressLine',
        postalCode: 'postalCode',
        city: 'city',
        country: 'country',
      },
      {
        addressLine: 'addressLine',
        postalCode: 'postalCode',
        city: 'city',
      },
    ]
    expect(areAddressType(args)).toBe(false)
  })

  test('returns true if arg is empty', () => {
    expect(areAddressType([])).toBe(true)
  })
})

describe('isAddressType', () => {
  test('returns true if arg is AddressType', () => {
    const arg = {
      addressLine: 'addressLine',
      postalCode: 'postalCode',
      city: 'city',
      country: 'country',
    }
    expect(isAddressType(arg)).toBe(true)
  })

  test('returns false if arg is not AddressType', () => {
    const arg = {
      addressLine: 'addressLine',
      postalCode: 'postalCode',
      city: 'city',
    }
    expect(isAddressType(arg)).toBe(false)
  })

  test('returns false if arg is empty', () => {
    expect(isAddressType({})).toBe(false)
  })
})
