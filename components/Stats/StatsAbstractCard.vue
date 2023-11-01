<template>
<div class="relative px-4 pt-5 pb-12 overflow-hidden bg-white rounded-lg shadow sm:px-6 sm:pt-6">
  <dt>
    <div class="absolute p-3 bg-indigo-500 rounded-md">
      <component
        :is="icon"
        class="w-6 h-6 text-white"
        aria-hidden="true"
      />
    </div>
    <p class="ml-16 text-sm font-medium text-gray-500 truncate">
      {{ title }}
    </p>
  </dt>
  <dd class="flex items-baseline pb-6 ml-16 sm:pb-7">
    <p class="text-2xl font-semibold text-gray-900">
      {{ count }}
    </p>
    <div
      v-if="link"
      class="absolute inset-x-0 bottom-0 px-4 py-4 bg-gray-50 sm:px-6"
    >
      <NuxtLink
        :to="{ name: link }"
        class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        View all
      </NuxtLink>
    </div>
  </dd>
</div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  count: number
  icon: Component
  link?: string
}

defineProps<Props>()
</script>
