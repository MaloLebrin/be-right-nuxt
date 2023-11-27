<template>
<NuxtLink
  :to="{ name: item.linkName }"
  exact-active-class="active-nuxt-link"
  class="flex items-center px-2 py-1 text-sm rounded-md group dark:text-gray-300 hover:bg-gray-700 hover:text-white"
  @click="closeDrawer"
>
  <component
    :is="item.icon"
    class="flex-shrink-0 w-6 h-6 mr-3 dark:text-gray-400 group-hover:text-gray-300"
    aria-hidden="true"
  />
  {{ item.label }}
</NuxtLink>
</template>

<script setup lang="ts">
import type { MenuItemContent } from '~~/types/Menu'
import { useUiStore } from '~~/store'

interface Props {
  item: MenuItemContent
}

defineProps<Props>()

const uiStore = useUiStore()
const { closeDrawer } = uiStore
</script>
