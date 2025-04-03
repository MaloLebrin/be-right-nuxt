<template>
<div
  :class="[
    'px-6 lg:px-8',
    className,
  ]">
  <div class="max-w-2xl mx-auto lg:max-w-7xl">
    <slot />
  </div>
</div>
</template>

<script setup lang="ts">
interface ContainerProps {
  className?: string
}

withDefaults(defineProps<ContainerProps>(), {
  className: ''
})
</script>
