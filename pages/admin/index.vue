<template>
<PageAuthWrapper>
  Test
</PageAuthWrapper>
</template>

<script setup lang="ts">
import PageAuthWrapper from '~/components/Page/PageAuthWrapper.vue'
import { useUiStore } from '~/store'

const { $api } = useNuxtApp()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const state = reactive({})

onMounted(async () => {
  IncLoading()
  DecLoading()
})

definePageMeta({
  layout: 'auth',
  isAuth: true,
  isAdmin: true,
  middleware: ['admin-guards-middleware'],
})
</script>
