import type { Price } from './Price'
import type { StripeObjectTypeEnum } from './index'

interface DefaultProduct {
  id: string
  object: StripeObjectTypeEnum
  active: boolean
  attributes: []
  created: number
  description: string
  features: []
  images: []
  livemode: false
  metadata: Record<string, any>
  name: string
  package_dimensions: null
  shippable: null
  statement_descriptor: null
  tax_code: string
  type: 'service'
  unit_label: null
  updated: number
  url: null
}

export interface Product extends DefaultProduct {
  default_price: string
}

export interface ProductWithPrice extends DefaultProduct {
  default_price: Price
}
