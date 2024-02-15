import { useProductStore, useUiStore } from '~/store'
import type { ProductWithPrice } from '~/types'

export default function productHook() {
  const { addMany } = useProductStore()
  const { IncLoading, DecLoading } = useUiStore()

  async function fetchAll() {
    IncLoading()

    const { data } = await useFetch<ProductWithPrice[]>('/api/stripe/products/list', {
      method: 'get',
    })

    if (data.value && data.value.length > 0) {
      addMany(data.value)
    }

    DecLoading()
  }

  return {
    fetchAll,
  }
}
