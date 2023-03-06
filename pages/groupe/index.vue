<template>
<PageAuthWrapper>
  list de groupe
</PageAuthWrapper>
</template>

<script setup lang="ts">
import {
  useGroupStore,
  useUiStore,
} from '~~/store'

const { IncLoading, DecLoading } = useUiStore()
const { fetchByUser } = groupHook()
const groupStore = useGroupStore()

onMounted(async () => {
  IncLoading()
  if (groupStore.getIsEmpty) {
    await fetchByUser()
  }
  DecLoading()
})

definePageMeta({
  layout: 'auth',
  isAuth: true,
  middleware: 'guards-middleware',
})
</script>
