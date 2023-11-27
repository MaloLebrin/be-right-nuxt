<template>
<nav class="flex-1 mt-5 space-y-2 text-gray-600">
  <div
    v-for="(item, index) in MENU_ITEMS"
    :key="index"
  >
    <Popover
      v-if="isFolder(item)"
      as="div"
      class="relative"
    >
      <PopoverButton class="flex items-center w-full px-2 py-1 text-sm rounded-md group dark:text-gray-300 hover:bg-gray-700 hover:text-white">
        <component
          :is="item.icon"
          class="flex-shrink-0 w-6 h-6 mr-3 group-hover:text-gray-300"
          aria-hidden="true"
        />
        {{ item.label }}
      </PopoverButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <PopoverPanel
          class="absolute top-0 z-50 w-56 mt-2 origin-top-right bg-white border border-red-400 divide-y divide-gray-100 rounded-md shadow-lg -right-40 focus:outline-none"
          as="ul"
        >
          <li
            v-for="(child, index) in item.children"
            :key="`${child.label}-${index}`"
            as="li"
          >
            <MenuLink :item="child" />
          </li>
        </PopoverPanel>
      </transition>
    </Popover>
    <MenuLink
      v-else
      :item="item"
    />
  </div>
</nav>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import type { MenuItemContent } from '~~/types/Menu'
import { MENU_ITEMS } from '@/helpers/menu'
import MenuLink from '~~/components/Menu/MenuLink.vue'

function isFolder(item: MenuItemContent) {
  return item.children && item.children.length && !item.linkName
}
</script>
