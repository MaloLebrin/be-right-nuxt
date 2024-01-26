import { describe, expect, test } from 'vitest'
import { areCompaniesTypes, isCompanyType } from '../../utils/company'

describe('isCompanyType', () => {
  test('returns true if arg is Company', () => {
    const arg = {
      subscriptionLabel: 'string',
      siret: 'string',
      name: 'string',
      subscriptionId: 1,
    }
    expect(isCompanyType(arg)).toBe(true)
  })

  test('returns false if arg is not Company', () => {
    const arg = {
      subscriptionLabel: 'string',
      siret: 'string',
      name: 'string',
    }
    expect(isCompanyType(arg)).toBe(false)
  })

  test('returns false if arg is empty', () => {
    expect(isCompanyType({})).toBe(false)
  })

  test('returns false if arg is null', () => {
    expect(isCompanyType(null)).toBe(false)
  })

  test('returns false if arg is undefined', () => {
    expect(isCompanyType(undefined)).toBe(false)
  })

  test('returns false if arg is string', () => {
    expect(isCompanyType('')).toBe(false)
  })

  test('returns false if arg is number', () => {
    expect(isCompanyType(1)).toBe(false)
  })
})

describe('areCompaniesTypes', () => {
  test('returns true if arg is Company[]', () => {
    const arg = [{
      subscriptionLabel: 'string',
      siret: 'string',
      name: 'string',
      subscriptionId: 1,
    }]
    expect(areCompaniesTypes(arg)).toBe(true)
  })

  test('returns false if arg is not Company[]', () => {
    const arg = [{
      subscriptionLabel: 'string',
      siret: 'string',
      name: 'string',
    }]
    expect(areCompaniesTypes(arg)).toBe(false)
  })

  test('returns false if arg is empty', () => {
    expect(areCompaniesTypes([])).toBe(true)
  })

  test('returns false if arg is null', () => {
    expect(areCompaniesTypes([null])).toBe(false)
  })

  test('returns false if arg is undefined', () => {
    expect(areCompaniesTypes([undefined])).toBe(false)
  })

  test('returns false if arg is string', () => {
    expect(areCompaniesTypes([''])).toBe(false)
  })

  test('returns false if arg is number', () => {
    expect(areCompaniesTypes([1])).toBe(false)
  })
})
