<template>
<Menu
  as="div"
  class="relative inline-block text-left"
>
  <div>
    <MenuButton
      :disabled="disabled"
      :data-cy="`user-${props.user.id}-options-links`"
      class="flex flex-col justify-center w-full px-2 py-1 space-y-1 disabled:cursor-not-allowed"
    >
      <div class="w-1 h-1 md:w-1.3 md:h-1.3 bg-purple-800 rounded-full" />
      <div class="w-1 h-1 md:w-1.3 md:h-1.3 bg-purple-800 rounded-full" />
      <div class="w-1 h-1 md:w-1.3 md:h-1.3 bg-purple-800 rounded-full" />
    </MenuButton>
  </div>

  <MenuItems
    class="absolute right-0 z-10 w-56 mt-2 overflow-visible origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
  >
    <MenuItem v-slot="{ active }">
      <NuxtLink
        class="flex items-center w-full px-3 py-3 text-sm rounded-md group"
        :class="[
          active ? 'bg-purple-100 text-purple-800' : 'text-gray-900',
        ]"
        :to="{
          name: RouteNames.ADMIN_USER_SHOW_ACCOUNT,
          params: { id: props.user.id },
          query: {
            'andFilters[company.id]': props.user.companyId,
          },
        }"
        :data-cy="`user-${props.user.id}-show-link`"
      >
        <PencilSquareIcon
          class="w-5 h-5 mr-2 text-violet-800"
          aria-hidden="true"
        />
        Voir / Modifier
      </NuxtLink>
    </MenuItem>

    <MenuItem
      v-if="!isDeleted"
      v-slot="{ active }"
    >
      <button
        class="flex items-center w-full px-3 py-3 text-sm rounded-md group"
        :class="[
          active ? 'bg-purple-100 text-purple-800' : 'text-gray-900',
        ]"
        @click="addEmployeeToUser"
      >
        <PlusCircleIcon
          class="w-5 h-5 mr-2 text-violet-800"
          aria-hidden="true"
        />
        Ajouter un destinataire
      </button>
    </MenuItem>

    <MenuItem
      v-slot="{ active }"
    >
      <NuxtLink
        v-if="!isDeleted"
        class="flex items-center w-full px-3 py-3 text-sm rounded-md cursor-pointer group"
        :class="[
          active ? 'bg-red-100 text-red-500' : 'text-gray-900',
        ]"
        @click="deleteUser(false)"
      >
        <ArchiveBoxIcon
          class="w-5 h-5 mr-2 text-red-500"
          aria-hidden="true"
        />
        Archiver
      </NuxtLink>
      <button
        v-else
        class="flex items-center w-full px-3 py-3 text-sm rounded-md cursor-pointer group"
        :class="[
          active ? 'bg-red-100 text-red-500' : 'text-gray-900',
        ]"
        :disabled="uiStore.getUIIsLoading"
        @click="restoreUser(user.id)"
      >
        <PlusCircleIcon
          class="w-5 h-5 mr-2 text-violet-800"
          aria-hidden="true"
        />
        Restaurer
      </button>
    </MenuItem>
    <MenuItem v-slot="{ active }">
      <NuxtLink
        v-if="!isDeleted"
        class="flex items-center w-full px-3 py-3 text-sm rounded-md cursor-pointer group"
        :class="[
          active ? 'bg-red-100 text-red-500' : 'text-gray-900',
        ]"
        @click="deleteUser(true)"
      >
        <TrashIcon
          class="w-5 h-5 mr-2 text-red-500"
          aria-hidden="true"
        />
        Supprimer définitivement
      </NuxtLink>
    </MenuItem>
  </MenuItems>
</Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ArchiveBoxIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/vue/24/outline'
import type { UserType } from '~~/types'
import { ModalModeEnum, ModalNameEnum } from '~~/types'
import { useUiStore } from '~~/store'
import { RouteNames } from '~~/helpers/routes'

interface Props {
  user: UserType
  disabled?: boolean
}

const props = defineProps<Props>()

const uiStore = useUiStore()
const { setUiModal } = uiStore
const { restoreUser } = userHook()

const isDeleted = computed(() => noNullUndefined(props.user.deletedAt))

function addEmployeeToUser() {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.ADD_EMPLOYEE_USER,
    modalMode: ModalModeEnum.CREATE,
    data: {
      userId: props.user.id,
    },
  })
}

function deleteUser(isForEver?: boolean) {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.USER_ADMIN,
    modalMode: ModalModeEnum.DELETE,
    data: {
      user: props.user,
      forEver: isForEver || false,
    },
  })
}
</script>
