import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async event => {
  const stripe = await useServerStripe(event)

  const customerId = getRouterParam(event, 'customerId')

  if (!customerId) {
    throw new Error('Missing customerId')
  }

  const sessions = await stripe.checkout.sessions.list({
    customer: customerId,
  })
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
  return sessions
})
