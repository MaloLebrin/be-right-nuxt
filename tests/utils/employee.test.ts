import { describe, expect, test } from 'vitest'
import {
  areEmployeeTypes,
  filteredEmployees,
  getEmployeeFullname,
  getEmployeeStatusColor,
  getEmployeeStatusSignature,
  isEmployeeType,
} from '../../utils/employee'
import type { EmployeeType } from '~/types'

describe('getEmployeeStatusSignature', () => {
  test('returns "Accepté" if employee has signed', () => {
    const employee = {
      hasSigned: true,
    } as EmployeeType
    expect(getEmployeeStatusSignature(employee)).toBe('Accepté')
  })

  test('returns "Refusé" if employee has not signed but has signedAt', () => {
    const employee = {
      hasSigned: false,
      signedAt: '2021-01-01',
    } as unknown as EmployeeType
    expect(getEmployeeStatusSignature(employee)).toBe('Refusé')
  })

  test('returns "En attente" if employee has not signed and has not signedAt', () => {
    const employee = {
      hasSigned: false,
    } as unknown as EmployeeType
    expect(getEmployeeStatusSignature(employee)).toBe('En attente')
  })

  test('returns "En attente" if employee has not signed and has signedAt but is null', () => {
    const employee = {
      hasSigned: false,
      signedAt: null,
    } as unknown as EmployeeType
    expect(getEmployeeStatusSignature(employee)).toBe('En attente')
  })
})

describe('getEmployeeStatusColor', () => {
  test('returns "text-green" if employee has signed', () => {
    const employee = {
      hasSigned: true,
    } as EmployeeType
    expect(getEmployeeStatusColor(employee)).toBe('text-green')
  })

  test('returns "text-green" if employee has signed', () => {
    const employee = {
      hasSigned: true,
      signedAt: '2021-01-01',
    } as unknown as EmployeeType
    expect(getEmployeeStatusColor(employee)).toBe('text-green')
  })

  test('returns "text-red" if employee has not signed but has signedAt', () => {
    const employee = {
      hasSigned: false,
      signedAt: '2021-01-01',
    } as unknown as EmployeeType
    expect(getEmployeeStatusColor(employee)).toBe('text-red')
  })

  test('returns "text-orange" if employee has not signed and has not signedAt', () => {
    const employee = {
      hasSigned: false,
    } as unknown as EmployeeType
    expect(getEmployeeStatusColor(employee)).toBe('text-orange')
  })

  test('returns "text-orange" if employee has not signed and has signedAt but is null', () => {
    const employee = {
      hasSigned: false,
      signedAt: null,
    } as unknown as EmployeeType
    expect(getEmployeeStatusColor(employee)).toBe('text-orange')
  })
})

describe('isEmployeeType', () => {
  test('returns true if arg is Employee', () => {
    const arg = {
      email: 'string',
      phone: 'string',
      slug: 'string',
      firstName: 'string',
      lastName: 'string',
    }
    expect(isEmployeeType(arg)).toBe(true)
  })

  test('returns false if arg is not Employee', () => {
    const arg = {
      email: 'string',
      phone: 'string',
      slug: 'string',
      firstName: 'string',
    }
    expect(isEmployeeType(arg)).toBe(false)
  })

  test('returns false if arg is empty', () => {
    expect(isEmployeeType({})).toBe(false)
  })

  test('returns false if arg is null', () => {
    expect(isEmployeeType(null)).toBe(false)
  })

  test('returns false if arg is undefined', () => {
    expect(isEmployeeType(undefined)).toBe(false)
  })

  test('returns false if arg is string', () => {
    expect(isEmployeeType('')).toBe(false)
  })

  test('returns false if arg is number', () => {
    expect(isEmployeeType(1)).toBe(false)
  })
})

describe('areEmployeeTypes', () => {
  test('returns true if arg is Employee[]', () => {
    const arg = [{
      email: 'string',
      phone: 'string',
      slug: 'string',
      firstName: 'string',
      lastName: 'string',
    }]
    expect(areEmployeeTypes(arg)).toBe(true)
  })

  test('returns false if arg is not Employee[]', () => {
    const arg = [{
      email: 'string',
      phone: 'string',
      slug: 'string',
      firstName: 'string',
    }]
    expect(areEmployeeTypes(arg)).toBe(false)
  })

  test('returns true if arg is empty', () => {
    expect(areEmployeeTypes([])).toBe(true)
  })
})

describe('getEmployeeFullname', () => {
  test('returns "firstName lastName" if both are defined', () => {
    const employee = {
      firstName: 'John',
      lastName: 'Doe',
    } as EmployeeType
    expect(getEmployeeFullname(employee)).toBe('John Doe')
  })

  test('returns "firstName" if only firstName is defined', () => {
    const employee = {
      firstName: 'John',
    } as EmployeeType
    expect(getEmployeeFullname(employee)).toBe('John')
  })

  test('returns "lastName" if only lastName is defined', () => {
    const employee = {
      lastName: 'Doe',
    } as EmployeeType
    expect(getEmployeeFullname(employee)).toBe(' Doe')
  })

  test('returns "" if both are undefined', () => {
    const employee = {} as EmployeeType
    expect(getEmployeeFullname(employee)).toBe('')
  })
})

describe('filteredEmployees', () => {
  const testList = [
    {
      firstName: 'Bernard',
      lastName: 'Bernard',
      email: '',
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      email: '',
    },
    {
      firstName: 'Amigus',
      lastName: 'Amigus',
      email: '',
    },
  ] as EmployeeType[]

  test('returns list if query is empty', () => {
    const list = filteredEmployees(testList, { value: '' } as Ref<string>)
    expect(list[0]).toStrictEqual({
      firstName: 'Bernard',
      lastName: 'Bernard',
      email: '',

    })
  })

  test('returns Amigus as first', () => {
    const list = filteredEmployees(testList, { value: 'Amigus' } as Ref<string>)
    expect(list[0]).toStrictEqual({
      firstName: 'Amigus',
      lastName: 'Amigus',
      email: '',
    })
  })

  test('returns Jane as first', () => {
    const list = filteredEmployees(testList, { value: 'Jane' } as Ref<string>)
    expect(list[0]).toStrictEqual({
      firstName: 'Jane',
      lastName: 'Doe',
      email: '',
    })
  })

  test('returns Bernard as first', () => {
    const list = filteredEmployees(testList, { value: 'Bernard' } as Ref<string>)
    expect(list[0]).toStrictEqual({
      firstName: 'Bernard',
      lastName: 'Bernard',
      email: '',
    })
  })

  test('returns empty list if query is not found', () => {
    const list = filteredEmployees(testList, { value: 'John' } as Ref<string>)
    expect(list).toStrictEqual([])
  })
})
