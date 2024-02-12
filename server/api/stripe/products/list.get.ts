import { useServerStripe } from '#stripe/server'
import { noNullUndefined } from '~~/utils/basics'

export default defineEventHandler(async event => {
  const stripe = await useServerStripe(event)

  const productsResponse = await stripe.products.list()

  const priceIds = productsResponse.data
    .map(product => product.default_price)
    .filter(priceId => noNullUndefined(priceId)) as string[]

  const prices = await Promise.all(
    priceIds.map(id => stripe.prices.retrieve(id)),
  )

  return productsResponse.data.map(product => ({
    ...product,
    default_price: prices.find(({ id }) => product.default_price === id),
  }))
})
