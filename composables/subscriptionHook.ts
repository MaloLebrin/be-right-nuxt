import { type SubscriptionType, useSubscriptionStore, useUiStore } from '~/store'

export default function subscriptionHook() {
  const { $api } = useNuxtApp()

  const subscriptionStore = useSubscriptionStore()
  const { IncLoading, DecLoading } = useUiStore()

  const { addMany } = subscriptionStore

  async function fetchOneSubscription(subscriptionId: number) {
    IncLoading()
    const { data: subscription } = await $api().get<SubscriptionType>(`admin/subscription/${subscriptionId}`)

    if (subscription) {
      addMany([subscription])
    }
    DecLoading()
  }

  return {
    fetchOneSubscription,
  }
}
