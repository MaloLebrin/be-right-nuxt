<template>
<ul className="flex flex-wrap gap-2">
  <li
    v-for="{ slug, title } in categories"
    :key="title">
    <NuxtLink
      v-if="slug"
      :to="`/blog/categories/${slug}`"
      class="px-2 font-medium text-gray-500 border border-gray-300 border-dotted rounded-full bg-gray-50 text-sm/6">
      {{ title }}
    </NuxtLink>
    <span
      v-else
      class="px-2 font-medium text-gray-500 border border-gray-300 border-dotted rounded-full bg-gray-50 text-sm/6">
      {{ title }}
    </span>
  </li>
</ul>
</template>

<script setup lang="ts">
import type { Category } from '~/types';

withDefaults(defineProps<{
  categories: Category[]
}>(), {
  categories: () => []
})
</script>
