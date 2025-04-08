<template>
<div class="flex flex-wrap items-center gap-2">
  <template
    v-for="category in getArticleCategories(categories)"
    :key="category?.title">
    <NuxtLink
      v-if="category?.slug && !pageCategoryDisable"
      :to="`/blog/categories/${category?.slug}`"
      class="group flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-all duration-200 bg-white border rounded-full hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
      :class="[
        'border-gray-200 text-gray-600',
        { 'pl-2': showIcon }
      ]"
    >
      <component
        :is="getCategoryIcon(category.slug)"
        v-if="showIcon"
        class="w-4 h-4"
      />
      {{ category.title }}
    </NuxtLink>
    <span
      v-else
      class="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-full"
      :class="{ 'pl-2': showIcon }"
    >
      <component
        :is="getCategoryIcon(category.slug)"
        v-if="showIcon"
        class="w-4 h-4"
      />
      {{ category?.title }}
    </span>
  </template>
</div>
</template>

<script setup lang="ts">
import type { CategorySlug } from '~/types'
import { getCategoryIcon } from '~/utils/blog'

interface Props {
  categories: CategorySlug[]
  pageCategoryDisable?: boolean
  showIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  categories: () => [],
  pageCategoryDisable: false,
  showIcon: true
})
</script>
