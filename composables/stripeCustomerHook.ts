import { type UserType, useCustomerStore, useUiStore, useUserStore } from '~/store'
import type { StripeCustomer } from '~/types'

export default function stripeCustomerHook() {
  const { $api } = useNuxtApp()
  const { IncLoading, DecLoading } = useUiStore()
  const { updateOneUser } = useUserStore()
  const stripeCustomerStore = useCustomerStore()

  async function fetchCustomer() {
    IncLoading()
    const { data } = await $api().get<{ user: UserType; stripeCustomer: StripeCustomer }>('stripe/customer/getByUserId')

    if (data) {
      const { user, stripeCustomer } = data
      updateOneUser(user.id, user)
      stripeCustomerStore.addOne(stripeCustomer)
    }
    DecLoading()
  }

  return {
    fetchCustomer,
  }
}
