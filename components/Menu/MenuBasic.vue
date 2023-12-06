<template>
<nav
  class="mt-5"
  role="menu"
>
  <ul
    role="list"
    class="space-y-2"
  >
    <li
      v-for="(item, index) in MENU_ITEMS"
      :key="index"
      v-element-hover="(state) => onHover(state, index)"
      role="menuitem"
    >
      <template v-if="isFolder(item)">
        <MenuLink
          :item="item"
          :is-active="isLinkActive(item) || isHovered === index"
        />
        <ul
          v-if="isLinkActive(item) || isHovered === index"
          role="list"
          class="space-y-1"
        >
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
          <li
            v-for="(child, index) in item.children"
            :key="index"
            role="menuitem"
          >
            <MenuLink
              :item="child"
              :is-active="isLinkActive(child)"
              is-child
            />
          </li>
        </ul>
      </template>

      <MenuLink
        v-else
        :item="item"
      />
    </li>
  </ul>

  <Tricks />
</nav>
</template>

<script setup lang="ts">
import { vElementHover } from '@vueuse/components'
import type { MenuItemContent } from '~~/types/Menu'
import { MENU_ITEMS } from '@/helpers/menu'
import Tricks from '~~/components/Tricks/Tricks.server.vue'
import MenuLink from '~~/components/Menu/MenuLink.vue'

const { $isDesktop } = useNuxtApp()
const route = useRoute()

function isFolder(item: MenuItemContent) {
  return item.children && item.children.length
}

const isHovered = ref <number | null>(0)

function onHover(state: boolean, index: number) {
  if (state) {
    isHovered.value = index
  } else if (isHovered.value === index) {
    isHovered.value = null
  }
}

function isLinkActive(item: MenuItemContent) {
  return !$isDesktop.value || item.linkName === route.name
    || item.children?.some(child => child.linkName === route.name)
}
</script>
