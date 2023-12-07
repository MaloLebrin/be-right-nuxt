<template>
<NuxtLink
  :id="item.linkName"
  :to="{ name: item.linkName }"
  class="flex items-center py-1 pl-2 text-sm border-l border-gray-200 text-zinc-500 hover:text-zinc-900"
  :class="[
    { 'pl-4 md:pl-6': isChild },
    { 'border-emerald-500 font-semibold text-zinc-900': isActive },
  ]"
  role="link"
  @click="closeDrawer"
>
  <template v-if="isChild">
    <component
      :is="item.icon"
      class="flex-shrink-0 w-5 h-5 mr-3 md:w-6 md:h-6"
      aria-hidden="true"
    />
  </template>
  <span class="truncate">{{ item.label }}</span>
</NuxtLink>
</template>

<script setup lang="ts">
import type { MenuItemContent } from '~~/types/Menu'
import { useUiStore } from '~~/store'

interface Props {
  item: MenuItemContent
  isChild?: boolean
  isActive?: boolean
}

defineProps<Props>()

const uiStore = useUiStore()
const { closeDrawer } = uiStore
</script>
