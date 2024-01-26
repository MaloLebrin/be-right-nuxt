import { hasOwnProperty } from '@antfu/utils'
import type { Group } from '~/store/group/types'

export function isGroupType(obj: unknown): obj is Group {
  return hasOwnProperty(obj, 'name')
    && hasOwnProperty(obj, 'description')
    && hasOwnProperty(obj, 'employeeIds')
}

export function areGroupTypes(objs: unknown[]): objs is Group[] {
  return objs.every(obj => isGroupType(obj))
}
