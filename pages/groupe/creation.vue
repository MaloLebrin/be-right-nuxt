<template>
<PageAuthWrapper>
  créer un groupe
</PageAuthWrapper>
</template>

<script setup lang="ts">
const { fetchUserGroupsAndRelations } = groupHook()

onMounted(async () => {
  await fetchUserGroupsAndRelations()
})

definePageMeta({
  layout: 'auth',
  isAuth: true,
  middleware: 'guards-middleware',
})
</script>
