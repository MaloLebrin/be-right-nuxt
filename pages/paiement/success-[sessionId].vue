<template>
<div class="h-48 bg-red-400">
  {{ $router.currentRoute.value.params.sessionId }}
</div>
</template>

<script setup lang="ts">
const { $router } = useNuxtApp()

definePageMeta({
  // layout: 'auth',
  // isAuth: true,
  // middleware: ['guards-middleware'],
})
</script>
