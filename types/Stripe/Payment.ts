import type { BaseStripeEntity } from '~/types/Stripe'

export interface CustomerPayment extends BaseStripeEntity {
  amount: number
  amount_capturable: number
  amount_details: {}
  amount_received: number
  application: string | null
  application_fee_amount: number | null
  canceled_at: number | null
  automatic_payment_methods: null
  cancellation_reason: string | null
  capture_method: string
  client_secret: string
  confirmation_method: string
  currency: string
  customer: string
  description: string | null
  invoice: string | null
  last_payment_error: string | null
  latest_charge: string | null
  live_mode: boolean
  metadata: object
  next_action: null | object
  on_behalf_of: null
  payment_method: string
  payment_method_configuration_details: null
  payment_method_options: object
  payment_method_types: string[]
  processing: null
  receipt_email: string | null
  review: null
  setup_future_usage: string | null
  shipping: null
  source: null
  statement_descriptor: string | null
  statement_descriptor_suffix: string | null
  status: 'succeeded' | 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'canceled' | 'requires_capture' | 'requires_source' | 'requires_source_action'
  transfer_data: null
  transfer_group: string | null
}
