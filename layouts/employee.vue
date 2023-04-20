<template>
<div>
  <LayoutsHeader />
  <main class="h-full bg-white">
    <slot />
  </main>
  <LayoutsFooter />
</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store'

const authStore = useAuthStore()
const route = useRoute()

const { query: { email, token } } = route
if (!authStore.getIsLoggedIn && email && token) {
  console.log(email, '<==== email')
}
</script>
