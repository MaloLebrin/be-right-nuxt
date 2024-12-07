import type { BaseStripeEntity, CurrencyEnum } from '~/types/Stripe'

export interface CheckoutSession extends BaseStripeEntity {
  adaptive_pricing: { enabled: boolean }
  after_expiration: null
  allow_promotion_codes: null
  amount_subtotal: number
  amount_total: number
  automatic_tax: { enabled: boolean }
  billing_address_collection: null
  cancel_url: string
  client_reference_id: null
  client_secret: string | null
  consent: null
  consent_collection: null
  created: number
  currency: CurrencyEnum
  currency_conversion: null
  // custom_fields: Array
  custom_text: CustomText
  cutomer: string
  customer_creation: null
  customer_details: CustomerDetails
  customer_email: string | null
  expires_at: number
  invoice: null
  invoice_creation: InvoiceCreation
  livemode: boolean
  locale: null
  metadata: object
  mode: 'payment'
  payment_intent: string
  payment_link: null
  payment_method_collection: 'if_required'
  payment_method_configuration_details: { id: string; parent: null }
  payment_method_options: { card: { request_three_d_secure: 'automatic' } }
  payment_method_types: string[]
  payment_status: 'unpaid' | 'paid' | 'no_payment_required'
  phone_number_collection: { enabled: boolean }
  recovered_from: null
  saved_payment_method_options: Saved_payment_method_options
  setup_intent: null
  shipping_address_collection: null
  shipping_cost: null
  shipping_details: null
  shipping_options: []
  status: 'incomplete' | 'active' | 'complete' | 'incomplete_expired' | 'canceled'
  submit_type: null
  subscription: null
  success_url: string
  total_details: { amount_discount: number; amount_shipping: number; amount_tax: number }
  uri_mode: 'hosted'
  url: null | string
}

interface CustomText {
  after_submit: null
  shipping_address: null
  submit: null
  terms_of_service_acceptance: null
}

interface CustomerDetails {
  address: {
    city: string
    country: string
    line1: string
    line2: string
    postal_code: string
    state: string | null
  }
  email: string
  name: string
  phone: string
  tax_exempt: 'exempt' | 'none' | 'reverse'
  tax_ids: string[]
}

interface InvoiceCreation {
  enabled: boolean
  invoice_data: {
    account_tax_ids: string[] | null
    custom_fields: null
    description: string | null
    footer: string | null
    issuer: string | null
    metadata: object
    rendering_options: object
  }
}

interface Saved_payment_method_options {
  allow_redisplay_filters: [ 'always' ]
  payment_method_remove: null
  payment_method_save: null
}
