import type { Product, StripeList } from '~/types'

export default function productHook() {
  async function fetchAllByUser() {
    const { data } = await useFetch<StripeList<Product>>('/api/stripe/products/list', {
      method: 'get',
    })
    console.log(data.value, '<==== data productHook')
    return data.value?.data
  }

  return {
    fetchAllByUser,
  }
}
