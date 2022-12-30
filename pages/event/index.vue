<template>
  <div class="flex items-center">
    Events
    user: {{ authStore.user }}
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~~/store'

const authStore = useAuthStore()
definePageMeta({
  isAuth: true,
  layout: "auth",
  middleware: 'auth'
})
</script>
