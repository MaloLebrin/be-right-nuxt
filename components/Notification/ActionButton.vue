<template>
<Menu
  as="div"
  class="relative inline-block text-left"
>
  <div>
    <MenuButton class="inline-flex justify-center w-full px-2 py-1 text-sm font-medium text-purple-500 bg-purple-300 border border-purple-500 rounded-md bg-opacity-20 hover:bg-opacity-40 hover:text-purple-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      Options
      <ChevronDownIcon
        class="w-5 h-5 ml-1 -mr-1 text-purple-500 hover:text-purple-800"
        aria-hidden="true"
      />
    </MenuButton>
  </div>

  <MenuItems class="absolute right-0 z-10 w-56 mt-2 overflow-visible origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
    <MenuItem
      v-if="props.eventId"
      v-slot="{ active }"
      as="div"
      class="px-1 py-1"
    >
      <NuxtLink
        class="flex items-center w-full px-2 py-2 text-sm rounded-md cursor-pointer group"
        :class="[
          active ? 'bg-purple-300 text-purple-800' : 'text-gray-900',
        ]"
        :to="{ name: 'evenement-show-id', params: { id: props.eventId } }"
        @click="patchAsRead([notification.id])"
      >
        <PencilSquareIcon
          class="w-5 h-5 mr-2 text-violet-400"
          aria-hidden="true"
        />
        Voir
      </NuxtLink>
    </MenuItem>

    <MenuItem
      v-show="!notification.readAt"
      v-slot="{ active }"
      as="div"
      class="px-1 py-1"
    >
      <NuxtLink
        class="flex items-center w-full px-2 py-2 text-sm rounded-md cursor-pointer group"
        :class="[
          active ? 'bg-purple-300 text-purple-800' : 'text-gray-900',
        ]"
        @click="patchAsRead([notification.id])"
      >
        <CheckBadgeIcon
          class="w-5 h-5 mr-2 text-green-400"
          aria-hidden="true"
        />
        Marquer comme lue
      </NuxtLink>
    </MenuItem>
  </MenuItems>
</Menu>
</template>

<script setup lang="ts">
import { CheckBadgeIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import type { NotificationType } from '~~/store'

interface Props {
  eventId?: number | null
  notification: NotificationType
}

const props = defineProps<Props>()

const { patchAsRead } = notificationHook()
</script>
