<template>
<PageAuthWrapper>
  <AccountBaseCard :title="`Modifier L'abonnement ${getUserfullName(user)}`">
    <section class="container py-8 mx-auto">
      <SubscriptionSelector :default-plan="defaultSubscription" />
    </section>
  </AccountBaseCard>
</PageAuthWrapper>
</template>

<script lang="ts" setup>
import PageAuthWrapper from '~~/components/Page/PageAuthWrapper.vue'
import { SubscriptionEnum, useCompanyStore, useSubscriptionStore, useUserStore } from '~/store'

const userStore = useUserStore()
const companyStore = useCompanyStore()
const subscriptionStore = useSubscriptionStore()

const route = useRoute()

const user = userStore.getOne(route.params.id)

const defaultSubscription = computed(() => {
  if (route.params.id) {
    const user = userStore.getOne(route.params.id)
    if (user) {
      const company = companyStore.getOne(user.companyId)
      if (company?.subscriptionId) {
        return subscriptionStore.getOne(company?.subscriptionId)?.type || SubscriptionEnum.BASIC
      }
    }
  }
  return SubscriptionEnum.BASIC
})

definePageMeta({
  layout: 'admin-user',
  isAuth: true,
  isAdmin: true,
  middleware: [
    'guards-middleware',
    'fetch-user-middleware',
    'company-middleware',
  ],
})
</script>
