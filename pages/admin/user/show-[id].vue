<template>
<PageAuthWrapper>
  show user
</PageAuthWrapper>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  isAuth: true,
  isAdmin: true,
  middleware: ['guards-middleware'],
})
</script>
