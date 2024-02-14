import { hasOwnProperty } from '@antfu/utils'
import { RoleEnum, type UserType } from '~/types'

export function isUserType(user: any): user is UserType {
  return hasOwnProperty(user, 'id') && hasOwnProperty(user, 'token')
}

export function isArrayUserType(users: any[]): users is UserType[] {
  return users?.every(isUserType)
}

export function isUserAdmin(user: UserType) {
  return user?.roles === RoleEnum.ADMIN
}

export function isUserOwner(user: UserType) {
  return user?.roles === RoleEnum.OWNER
}

export function filteredUsers(list: UserType[], query: Ref<string>): UserType[] {
  return (query.value === '' || !query.value)
    ? list
    : list.filter(person =>
      person.lastName
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      || person.firstName
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, '')),
    )
}

export function getRoleTranslation(role: RoleEnum) {
  switch (role) {
    case RoleEnum.ADMIN:
      return 'Administrateur'
    case RoleEnum.USER:
      return 'Utilisateur'
    case RoleEnum.EMPLOYEE:
      return 'Destinataire'
    case RoleEnum.SUPER_USER:
      return 'Super utilisateur'
    case RoleEnum.OWNER:
      return 'Propriétaire'
    case RoleEnum.PHOTOGRAPHER:
      return 'Photographe'

    default:
      return 'Utilisateur'
  }
}

export function getUserfullName(user: Pick<UserType, 'firstName' | 'lastName'>) {
  let str = ''
  if (user?.firstName)
    str += user.firstName
  if (user?.lastName)
    str += ` ${user.lastName}`
  return str
}
