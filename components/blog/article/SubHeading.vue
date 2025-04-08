<template>
<p
  :class="[
    'font-mono font-semibold tracking-widest text-gray-500 uppercase text-xs/5',
    additionnalClasses,
  ]"><slot/></p>
</template>

<script setup lang="ts">
defineProps<{
  additionnalClasses?: string
}>()
</script>
