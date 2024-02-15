import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async event => {
  const stripe = await useServerStripe(event)

  const customerId = getRouterParam(event, 'customerId')
  const sessions = await stripe.checkout.sessions.list({
    customer: customerId,
  })

  return sessions
})
