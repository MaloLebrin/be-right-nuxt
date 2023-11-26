<template>
<div
  v-for="n in nb"
  :key="n"
  class="relative px-2 py-2 bg-white md:px-3 md:py-4 animate-pulse"
>
  <div class="flex justify-end md:block">
    <div class="w-3 h-3 bg-gray-300 rounded-full md:w-5 md:h-5 " />
  </div>

  <ol class="flex items-center mt-2 space-x-1 md:space-x-0 md:space-y-3 md:block">
    <div class="w-2 h-2 bg-gray-300 rounded-md md:h-4 md:w-full " />
    <div class="w-2 h-2 bg-gray-300 rounded-md md:h-4 md:w-3/4" />
    <div class="w-2 h-2 bg-gray-300 rounded-md md:h-4 md:w-1/2" />
  </ol>
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
