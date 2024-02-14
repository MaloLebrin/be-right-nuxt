import { hasOwnProperty } from '@antfu/utils'
import type { AddressType } from '~/store/address/types'

export function isAddressType(arg: unknown): arg is AddressType {
  return hasOwnProperty(arg, 'addressLine')
    && hasOwnProperty(arg, 'postalCode')
    && hasOwnProperty(arg, 'city')
    && hasOwnProperty(arg, 'country')
}

export function areAddressType(args: unknown[]): args is AddressType[] {
  return args.every(arg => isAddressType(arg))
}
