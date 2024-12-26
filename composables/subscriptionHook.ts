import { type SubscriptionType, useSubscriptionStore, useUiStore } from '~/store'

export default function subscriptionHook() {
  const { $api, $toast } = useNuxtApp()

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

  async function updateSubscription(subscription: SubscriptionType) {
    IncLoading()
    const { data: updatedSubscription } = await $api().patch<SubscriptionType>('admin/subscription', subscription)

    if (updatedSubscription) {
      addMany([updatedSubscription])
      $toast.success('Subscription updated')
    }
    DecLoading()
  }

  return {
    fetchOneSubscription,
    updateSubscription,
  }
}
