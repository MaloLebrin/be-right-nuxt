<template>
<PageAuthWrapper>
  show user n° {{ $route.params.id }} evenements
</PageAuthWrapper>
</template>

<script setup lang="ts">
import PageAuthWrapper from '~~/components/Page/PageAuthWrapper.vue'

definePageMeta({
  layout: 'admin-user',
  isAuth: true,
  isAdmin: true,
  middleware: ['guards-middleware', 'fetch-user-middleware'],
})
</script>
