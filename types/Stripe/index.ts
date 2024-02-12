export * from './Product'

export interface StripeList<T> {
  object: string
  url: string
  has_more: boolean
  data: T[]
}

export enum StripeObjectTypeEnum {
  PRODUCT = 'product',
}
