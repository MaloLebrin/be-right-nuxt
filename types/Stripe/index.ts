export * from './Product'
export * from './Price'
export * from './Session'
export * from './Customer'

export interface StripeList<T> {
  object: string
  url: string
  has_more: boolean
  data: T[]
}

export enum StripeObjectTypeEnum {
  PRODUCT = 'product',
  PRICE = 'price',
}

export enum CurrencyEnum {
  EUR = 'eur',
}

export interface BaseStripeEntity {
  id: string
  created: number
  object: string
}
