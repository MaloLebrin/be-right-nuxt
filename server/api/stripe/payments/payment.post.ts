import { useServerStripe } from '#stripe/server'

const config = useRuntimeConfig()

export default defineEventHandler(async event => {
  const { stripeCustomerId, nbRecipients } = await readBody<{ stripeCustomerId: string; nbRecipients: number }>(event)
  const stripe = await useServerStripe(event)

  const priceId = process.env.STRIPE_UNIT_PRICE_ID

  if (!priceId || !stripeCustomerId || !nbRecipients) {
    throw createError('Missing Data')
  }

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: priceId,
        quantity: nbRecipients,

      },
    ],
    mode: 'payment',
    success_url: `${config.public.APP_URL}/paiement/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.public.APP_URL}/paiement/cancel`,
    customer: stripeCustomerId,
  })

  if (!session || !session.url) {
    throw createError('Missing stripe session')
  }

  await sendRedirect(event, session.url)
})
