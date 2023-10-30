<template>
<PageAuthWrapper>
  <div class="py-4 md:py-8">
    <NotificationSubscriptionForm />

    <NotificationTableList
      :notifications="notificationStore.getAllSorted"
    />
  </div>
</PageAuthWrapper>
</template>

<script setup lang="ts">
import {
  useNotificationsStore,
  useUiStore,
} from '~~/store'
import NotificationSubscriptionForm from '~~/components/Notification/subscription/Form.vue'
import NotificationTableList from '~~/components/Notification/table/List.vue'
import PageAuthWrapper from '~/components/Page/PageAuthWrapper.vue'

const { IncLoading, DecLoading } = useUiStore()
const { fetchUserNotificationsAndRelations } = notificationHook()
const { fetchSubscriptions } = notificationSubscriptionHook()

const notificationStore = useNotificationsStore()

onMounted(async () => {
  IncLoading()
  await fetchSubscriptions()
  await fetchUserNotificationsAndRelations()
  DecLoading()
})

definePageMeta({
  layout: 'auth',
  isAuth: true,
  middleware: 'guards-middleware',
})
</script>
