<template>
<main class="min-h-screen">
  <LayoutsHeader />
  <div class="h-full bg-white">
    <slot />
  </div>
  <LayoutsFooter />
</main>
</template>

<script setup lang="ts">
const router = useRouter()

const { query: { email, token } } = router.currentRoute.value
if (!email || !token) {
  router.replace({
    name: 'answer-error',
  })
}
</script>
