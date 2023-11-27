<template>
<div
  v-for="n in nb"
  :key="n"
  class="flex flex-col items-center justify-center w-full py-2 capitalize bg-white md:py-4 lg:py-6 animate-pulse"
>
  <div class="flex items-center justify-center w-full space-x-1">
    <div class="w-2 h-2 bg-gray-200 rounded-md md:h-4 md:w-3/4" />
  </div>
</div>
</template>

<script setup lang="ts">
interface Props {
  nb?: number
}

withDefaults(defineProps<Props>(), {
  nb: 1,
})
</script>
