import { hasOwnProperty } from '@antfu/utils'
import type { EmployeeType } from '~/store/employee/types'

export function getEmployeeStatusSignature(employee: EmployeeType): string {
  if (employee.hasSigned) {
    return 'Accepté'
  } else {
    if (employee.signedAt) {
      return 'Refusé'
    }
    return 'En attente'
  }
}

export function getEmployeeStatusColor(employee: EmployeeType): string {
  if (employee.hasSigned) {
    return 'text-green'
  } else {
    if (employee.signedAt) {
      return 'text-red'
    }
    return 'text-orange'
  }
}

export function isEmployeeType(arg: unknown): arg is EmployeeType {
  return hasOwnProperty(arg, 'email')
    && hasOwnProperty(arg, 'phone')
    && hasOwnProperty(arg, 'slug')
    && hasOwnProperty(arg, 'firstName')
    && hasOwnProperty(arg, 'lastName')
}

export function areEmployeeTypes(args: unknown[]): args is EmployeeType[] {
  return args.every(arg => isEmployeeType(arg))
}

export function getEmployeeFullname(employee: EmployeeType): string {
  let str = ''
  if (employee?.firstName)
    str += employee.firstName
  if (employee?.lastName)
    str += ` ${employee.lastName}`
  return str
}

export function filteredEmployees(list: EmployeeType[], query: Ref<string>): EmployeeType[] {
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
        .includes(query.value.toLowerCase().replace(/\s+/g, ''))
      || person.email
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, '')),
    )
}
