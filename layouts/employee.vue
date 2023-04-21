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
const router = useRouter()

const { query: { email, token } } = router.currentRoute.value
if (!authStore.getIsLoggedIn && email && token) {
  router.replace({
    name: 'answer-error',
  })
}
</script>
