import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async event => {
  console.log(event.context.auth, '<==== event.context.auth')
  console.log(event.context, '<==== event.context')

  const stripe = await useServerStripe(event)
  console.info('Stripe instance:', stripe)

  const customerId = getRouterParam(event, 'customerId')
  const sessions = await stripe.checkout.sessions.list({
    customer: customerId,
  })

  console.log(sessions, '<==== sessions')

  return sessions
})
