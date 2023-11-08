<template>
<PageAuthWrapper>
  Edit User
</PageAuthWrapper>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  isAuth: true,
  isAdmin: true,
  middleware: ['guards-middleware', 'fetch-user-middleware'],
})
</script>
