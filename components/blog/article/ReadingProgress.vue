<template>
<div
  class="fixed top-0 left-0 z-50 w-full h-1 bg-gray-100"
  aria-hidden="true"
>
  <div
    class="h-full transition-all duration-200 bg-blue-600"
    :style="{ width: `${progress}%` }"
  />
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const progress = ref(0)

const calculateProgress = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight - windowHeight
  const scrollTop = window.scrollY
  progress.value = (scrollTop / documentHeight) * 100
}

onMounted(() => {
  window.addEventListener('scroll', calculateProgress)
  calculateProgress() // Initial calculation
})

onUnmounted(() => {
  window.removeEventListener('scroll', calculateProgress)
})
</script> 
