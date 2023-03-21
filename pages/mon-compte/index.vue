<template>
<div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
  <AccountBaseCard
    title="Mon profile"
    description="Vous pouvez modifier vos données personnelles"
  >
    <div class="px-4 mt-6">
      <UserForm :user="userStore.getAuthUser" />
    </div>
  </AccountBaseCard>
</div>
</template>

<script setup lang="ts">
import { useUserStore } from '~~/store'

const userStore = useUserStore()

definePageMeta({
  layout: 'account',
  isAuth: true,
  middleware: 'guards-middleware',
})
</script>
