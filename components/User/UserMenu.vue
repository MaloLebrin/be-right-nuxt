<template>
<Menu
  as="div"
  class="relative md:ml-3"
>
  <div>
    <MenuButton
      v-if="userStore.getAuthUser"
      class="flex items-center flex-shrink-0 p-4"
      data-cy="user-menu-button"
    >
      <UserAvatar
        :user="userStore.getAuthUser"
        :size="$isMobile ? 'sm' : 'md'"
      />
      <div
        v-if="!isInHeader"
        class="ml-3"
      >
        <p class="text-xs font-medium text-gray-600 md:text-sm dark:text-white">
          {{ authStore.getLoggedUserFullName }}
        </p>
      </div>
    </MenuButton>
  </div>
  <MenuItems
    class="absolute w-48 py-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    :class="[isInHeader ? 'origin-top-left -left-28' : 'origin-top-right -top-24']"
    as="div"
  >
    <MenuItem
      v-if="userStore.getAuthUser"
      v-slot="{ active }"
      as="div"
    >
      <NuxtLink
        :to="{ name: 'mon-compte', params: { id: userStore.getAuthUser.id } }"
        class="flex items-center justify-start px-4 py-2 space-x-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-800"
        :class="[active ? 'bg-gray-100' : '']"
      >
        <UserCircleIcon
          class="h-6 text-gray-500 hover:text-red-800"
          :class="{ active: 'hover:text-red-800' }"
        />
        <span>Voir le profile</span>
      </NuxtLink>
    </MenuItem>
    <MenuItem>
      <a
        data-cy="user-menu-logout-link"
        class="flex items-center justify-start px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-red-100 hover:text-red-800"
        @click="onToggleLogout"
      >
        <ArrowLeftStartOnRectangleIcon class="h-6 text-gray-500" />
        Se déconnecter
      </a>
    </MenuItem>
  </MenuItems>
</Menu>
</template>

<script setup lang="ts">
import { ArrowLeftStartOnRectangleIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import UserAvatar from '~/components/User/UserAvatar.vue'
import { useAuthStore, useUserStore } from '~~/store'

withDefaults(defineProps<Props>(), {
  isInHeader: false,
})
const userStore = useUserStore()
const authStore = useAuthStore()
const { logout } = authHook()
const router = useRouter()

interface Props {
  isInHeader?: boolean
}

function onToggleLogout() {
  logout()
  router.replace('/')
}
</script>
