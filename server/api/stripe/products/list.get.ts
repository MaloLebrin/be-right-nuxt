import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async event => {
  const stripe = await useServerStripe(event)

  const products = await stripe.products.list({
  })

  console.log(products, '<==== products List')

  return products
})
