<template>
<PageAuthWrapper>
  Day view
</PageAuthWrapper>
</template>

<script setup lang="ts">
import PageAuthWrapper from '~/components/Page/PageAuthWrapper.vue'

calendarHook('week')

useHead({
  title: 'Calendrier - Vue mois',
})

definePageMeta({
  layout: 'auth',
  isAuth: true,
  isAdmin: false,
  middleware: ['guards-middleware'],
})
</script>
