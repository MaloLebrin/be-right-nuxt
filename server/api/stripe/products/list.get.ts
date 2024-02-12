import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async event => {
  const stripe = await useServerStripe(event)

  const products = await stripe.products.list({
  })

  return products
})
