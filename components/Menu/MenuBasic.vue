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
      role="menuitem"
    >
      <template v-if="isFolder(item)">
        <MenuLink
          v-element-hover="(state) => onHover(state, index)"
          :item="item"
          :is-active="isLinkActive(item)"
        />
        <transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <ul
            v-if="isLinkActive(item) || isHovered === index"
            role="list"
            class="space-y-1"
          >
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
        </transition>
      </template>

      <MenuLink
        v-else
        :item="item"
      />
    </li>
  </ul>
</nav>
</template>

<script setup lang="ts">
import { vElementHover } from '@vueuse/components'
import type { MenuItemContent } from '~~/types/Menu'
import { MENU_ITEMS } from '@/helpers/menu'
import MenuLink from '~~/components/Menu/MenuLink.vue'

const route = useRoute()

function isFolder(item: MenuItemContent) {
  return item.children && item.children.length
}

const isHovered = ref<number>(0)

function onHover(state: boolean, index: number) {
  if (state) {
    isHovered.value = index
  }
}

function isLinkActive(item: MenuItemContent) {
  return item.linkName === route.name
    || item.children?.some(child => child.linkName === route.name)
}
</script>
