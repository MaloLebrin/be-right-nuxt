import { useServerStripe } from '#stripe/server'

const config = useRuntimeConfig()

export default defineEventHandler(async event => {
  const { stripeCustomerId } = await readBody<{ stripeCustomerId: string }>(event)
  const stripe = await useServerStripe(event)

  const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID

  if (!priceId || !stripeCustomerId) {
    throw createError('Missing STRIPE_SUBSCRIPTION_PRICE_ID')
  }

  if (!stripeCustomerId) {
    throw createError('Missing stripeCustomerId')
  }

  const price = await stripe.prices.retrieve(priceId)

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: price.id,
        quantity: 1,

      },
    ],
    mode: 'subscription',
    success_url: `${config.public.APP_URL}/paiement/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.public.APP_URL}/paiement/cancel`,
    customer: stripeCustomerId,
  })

  if (!session || !session.url) {
    throw createError('Missing stripe session')
  }

  await sendRedirect(event, session.url)
})
