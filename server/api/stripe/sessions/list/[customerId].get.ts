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

  console.log(sessions.data[0], '<==== sessions.data[0]')

  return sessions
})
