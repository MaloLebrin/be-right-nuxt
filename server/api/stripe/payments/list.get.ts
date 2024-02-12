import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async event => {
  const stripe = await useServerStripe(event)
  console.info('Stripe instance:', stripe)

  return {
    version: stripe.VERSION,
  }
})
