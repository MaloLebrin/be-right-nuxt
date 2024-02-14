import { describe, expect, test } from 'vitest'
import {
  areGroupTypes,
  isGroupType,
} from '../../utils/group'

describe('areGroupTypes', () => {
  test('returns true if all args are GroupType', () => {
    const args = [
      {
        name: 'name',
        description: 'description',
        employeeIds: [1],
      },
      {
        name: 'name',
        description: 'description',
        employeeIds: [1],
      },
    ]
    expect(areGroupTypes(args)).toBe(true)
  })

  test('returns false if any arg is not GroupType', () => {
    const args = [
      {
        name: 'name',
        description: 'description',
        employeeIds: [1],
      },
      {
        name: 'name',
        description: 'description',
      },
    ]
    expect(areGroupTypes(args)).toBe(false)
  })

  test('returns true if arg is empty', () => {
    expect(areGroupTypes([])).toBe(true)
  })
})

describe('isGroupType', () => {
  test('returns true if arg is GroupType', () => {
    const arg = {
      name: 'name',
      description: 'description',
      employeeIds: [1],
    }
    expect(isGroupType(arg)).toBe(true)
  })

  test('returns false if arg is not GroupType', () => {
    const arg = {
      name: 'name',
      description: 'description',
    }
    expect(isGroupType(arg)).toBe(false)
  })

  test('returns false if arg is empty', () => {
    expect(isGroupType({})).toBe(false)
  })

  test('returns false if arg is null', () => {
    expect(isGroupType(null)).toBe(false)
  })

  test('returns false if arg is undefined', () => {
    expect(isGroupType(undefined)).toBe(false)
  })

  test('returns false if arg is number', () => {
    expect(isGroupType(1)).toBe(false)
  })

  test('returns false if arg is string', () => {
    expect(isGroupType('string')).toBe(false)
  })
})
