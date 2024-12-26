import { uniq } from '@antfu/utils'
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

  async function fetchMany(userIds: number[]) {
    IncLoading()
    if (userIds.length > 0) {
      const { data } = await $api().get<SubscriptionType[]>(`admin/subscription/manyByIds?ids=${uniq(userIds).join(',')}`)

      if (data && data.length > 0) {
        const missingSubscriptions = data.filter(user => !subscriptionStore.isAlreadyInStore(user.id))

        if (missingSubscriptions.length > 0) {
          addMany(missingSubscriptions)
        }
      }
    }
    DecLoading()
  }

  return {
    fetchOneSubscription,
    fetchMany,
    updateSubscription,
  }
}
