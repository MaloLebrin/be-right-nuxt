import type { StripeObjectTypeEnum } from './index'

export interface Product {
  id: string
  object: StripeObjectTypeEnum
  active: boolean
  attributes: []
  created: number
  default_price: string
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
