import { describe, expect, test } from 'vitest'
import {
  filteredUsers,
  getRoleTranslation,
  isArrayUserType,
  isUserAdmin,
  isUserOwner,
  isUserType,
} from '../../utils/user'
import type { RoleEnum, UserType } from '~/types'

describe('isUserType', () => {
  test('should return true if arg is UserType', () => {
    expect(isUserType({ id: 1, token: 'fkldjklgr' })).toBe(true)
    expect(isUserType({ id: 1, token: 'fkldjklgr', firstName: 'John' })).toBe(true)
  })

  test('should return false if arg is not UserType', () => {
    expect(isUserType({ id: 1, firstName: 'John' })).toBe(false)
    expect(isUserType({ token: 'fkldjklgr', firstName: 'John' })).toBe(false)
  })

  test('should return false if arg is not object', () => {
    expect(isUserType(1)).toBe(false)
    expect(isUserType('John')).toBe(false)
    expect(isUserType([1, 2, 3])).toBe(false)
  })

  test('should return false if arg is null or undefined', () => {
    expect(isUserType(null)).toBe(false)
    expect(isUserType(undefined)).toBe(false)
  })
})

describe('isArrayUserType', () => {
  test('should return true if arg is UserType[]', () => {
    expect(isArrayUserType([{ id: 1, token: 'fkldjklgr' }])).toBe(true)
    expect(isArrayUserType([{ id: 1, token: 'fkldjklgr', firstName: 'John' }])).toBe(true)
    expect(isArrayUserType([])).toBe(true)
  })

  test('should return false if arg is not UserType[]', () => {
    expect(isArrayUserType([
      { id: 1, firstName: 'John' },
      { id: 1, token: 'fkldjklgr', firstName: 'John' },
    ])).toBe(false)
    expect(isArrayUserType([
      { token: 'fkldjklgr', firstName: 'John' },
      { id: 1, token: 'fkldjklgr', firstName: 'John' },
    ])).toBe(false)
  })
})

describe('isUserAdmin', () => {
  test('should return true if user is admin', () => {
    expect(isUserAdmin({ id: 1, token: 'fkldjklgr', roles: 'ADMIN' } as UserType)).toBe(true)
  })

  test('should return false if user is not admin', () => {
    expect(isUserAdmin({ id: 1, token: 'fkldjklgr', roles: 'USER' } as UserType)).toBe(false)
    expect(isUserAdmin({ id: 1, token: 'fkldjklgr', roles: 'EMPLOYEE' } as UserType)).toBe(false)
    expect(isUserAdmin({ id: 1, token: 'fkldjklgr', roles: 'OWNER' } as UserType)).toBe(false)
    expect(isUserAdmin({ id: 1, token: 'fkldjklgr' } as UserType)).toBe(false)
  })

  test('should return false if user is null or undefined', () => {
    expect(isUserAdmin(null as unknown as UserType)).toBe(false)
    expect(isUserAdmin(undefined as unknown as UserType)).toBe(false)
  })
})

describe('isUserOwner', () => {
  test('should return true if user is owner', () => {
    expect(isUserOwner({ id: 1, token: 'fkldjklgr', roles: 'OWNER' } as UserType)).toBe(true)
  })

  test('should return false if user is not owner', () => {
    expect(isUserOwner({ id: 1, token: 'fkldjklgr', roles: 'USER' } as UserType)).toBe(false)
    expect(isUserOwner({ id: 1, token: 'fkldjklgr', roles: 'EMPLOYEE' } as UserType)).toBe(false)
    expect(isUserOwner({ id: 1, token: 'fkldjklgr', roles: 'ADMIN' } as UserType)).toBe(false)
    expect(isUserOwner({ id: 1, token: 'fkldjklgr' } as UserType)).toBe(false)
  })

  test('should return false if user is null or undefined', () => {
    expect(isUserOwner(null as unknown as UserType)).toBe(false)
    expect(isUserOwner(undefined as unknown as UserType)).toBe(false)
  })
})

describe('filteredUsers', () => {
  test('should return all users if query is empty', () => {
    const users = [
      { id: 1, firstName: 'John', lastName: 'Doe' },
      { id: 2, firstName: 'Jane', lastName: 'Doe' },
      { id: 3, firstName: 'Jack', lastName: 'Doe' },
    ] as UserType[]
    const query = { value: '' } as Ref<string>
    expect(filteredUsers(users, query)).toStrictEqual(users)
  })

  test('should return filtered users if query is not empty', () => {
    const users = [
      { id: 1, firstName: 'John', lastName: 'Doe' },
      { id: 2, firstName: 'Jane', lastName: 'Doe' },
      { id: 3, firstName: 'Jack', lastName: 'Doe' },
    ] as UserType[]
    const query = { value: 'John' } as Ref<string>
    expect(filteredUsers(users, query)).toStrictEqual([{ id: 1, firstName: 'John', lastName: 'Doe' }])
  })

  test('should return filtered users if query is not empty', () => {
    const users = [
      { id: 1, firstName: 'John', lastName: 'Doe' },
      { id: 2, firstName: 'Jane', lastName: 'Doe' },
      { id: 3, firstName: 'Jack', lastName: 'Doe' },
    ] as UserType[]
    const query = { value: 'Doe' } as Ref<string>
    expect(filteredUsers(users, query)).toStrictEqual(users)
  })
})

describe('getRoleTranslation', () => {
  test('should return role translation', () => {
    expect(getRoleTranslation('ADMIN' as RoleEnum)).toBe('Administrateur')
    expect(getRoleTranslation('USER' as RoleEnum)).toBe('Utilisateur')
    expect(getRoleTranslation('EMPLOYEE' as RoleEnum)).toBe('Destinataire')
    expect(getRoleTranslation('SUPER_USER' as RoleEnum)).toBe('Super utilisateur')
    expect(getRoleTranslation('OWNER' as RoleEnum)).toBe('Propriétaire')
    expect(getRoleTranslation('PHOTOGRAPHER' as RoleEnum)).toBe('Photographe')
  })

  test('should return role translation', () => {
    expect(getRoleTranslation('' as RoleEnum)).toBe('Utilisateur')
    expect(getRoleTranslation(' ' as RoleEnum)).toBe('Utilisateur')
    expect(getRoleTranslation('unknown' as RoleEnum)).toBe('Utilisateur')
  })
})
