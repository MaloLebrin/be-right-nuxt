<template>
<PageAuthWrapper>
  <h1>Paramètres de l'utilisateur</h1>
</PageAuthWrapper>
</template>

<script lang="ts" setup>
import PageAuthWrapper from '~~/components/Page/PageAuthWrapper.vue'

definePageMeta({
  layout: 'admin-user',
  isAuth: true,
  isAdmin: true,
  middleware: [
    'guards-middleware',
    'fetch-user-middleware',
    'company-middleware',
  ],
})
</script>
