<template>
<PageAuthWrapper>
  Users
</PageAuthWrapper>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  isAuth: true,
  isAdmin: true,
  middleware: 'guards-middleware',
})
</script>
