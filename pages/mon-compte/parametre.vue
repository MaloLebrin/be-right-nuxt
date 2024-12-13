<template>
<div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
  Paramètres
</div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'account',
  isAuth: true,
  middleware: 'guards-middleware',
})
</script>
