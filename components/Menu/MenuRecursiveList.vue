<template>
<li
  v-for="(item, index) in menuItems"
  :key="index"
  v-element-hover="(state) => onHover(state, index)"
  class="pl-2 md:pl-4"
  role="menuitem"
>
  <template v-if="isFolder(item)">
    <MenuLink
      :item="item"
      :is-active="isLinkActive(item).value || isHovered === index"
    />
    <MenuRecursiveList
      :menu-items="item.children"
    />
  </template>

  <MenuLink
    v-else
    :item="item"
    :is-active="isLinkActive(item).value"
  />
</li>
</template>

<script setup lang="ts">
import { vElementHover } from '@vueuse/components'
import type { MenuItemContent } from '~~/types/Menu'
import MenuLink from '~~/components/Menu/MenuLink.vue'

interface Props {
  menuItems: MenuItemContent[]
  isChild?: boolean
}

withDefaults(defineProps<Props>(), {
  menuItems: () => [],
})

const { $isDesktop } = useNuxtApp()
const route = useRoute()

function isFolder(item: MenuItemContent) {
  return item.children && item.children.length > 0
}

const isHovered = ref <number | null>(0)
const isHoveredChild = ref <number | null>(0)

function onHover(state: boolean, index: number) {
  if (state) {
    isHovered.value = index
  } else if (isHovered.value === index) {
    isHovered.value = null
  }
}

function onHoverChild(state: boolean, index: number) {
  if (state) {
    isHoveredChild.value = index
  } else if (isHoveredChild.value === index) {
    isHoveredChild.value = null
  }
}

const isLinkActive = (item: MenuItemContent) => computed(() =>
  !$isDesktop.value || item.linkName === route.name
    || item.children?.some(child => child.linkName === route.name),
)
</script>

<style scoped>
.active-link {
  @apply border-emerald-500 font-semibold text-zinc-900;
}
</style>
<!-- v-motion -->
<!-- :initial="{
      y: -100,
      opacity: 0,
    }"
    :enter="{
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        mass: 0.5,
      },
    }" -->
