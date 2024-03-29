<template>
<Menu
  as="div"
  class="relative inline-block text-left"
>
  <div>
    <MenuButton
      :data-cy="`event-${props.event.id}-options-links`"
      class="flex flex-col justify-center w-full px-2 py-1 space-y-1"
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
        :to="{ name: 'evenement-show-id', params: { id: props.event.id } }"
        :data-cy="`event-${props.event.id}-show-link`"
      >
        <PencilSquareIcon
          class="w-5 h-5 mr-2 text-violet-800"
          aria-hidden="true"
        />
        Voir / Modifier
      </NuxtLink>
    </MenuItem>
    <MenuItem v-if="authStore.isAuthUserAdmin">
      <button
        class="flex items-center w-full px-3 py-3 text-sm rounded-md group hover:bg-purple-100 hover:text-purple-800"
        @click="syncEvent(event.id)"
      >
        <ArrowPathIcon
          class="w-5 h-5 mr-2 text-violet-800"
          aria-hidden="true"
        />
        Synchroniser
      </button>
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
        @click="addEmployeeToEvent"
      >
        <PlusCircleIcon
          class="w-5 h-5 mr-2 text-violet-800"
          aria-hidden="true"
        />
        Ajouter un destinataire
      </button>
    </MenuItem>

    <MenuItem
      v-if="!isDeleted"
      v-slot="{ active }"
    >
      <button
        class="flex items-center w-full px-3 py-3 text-sm rounded-md cursor-pointer group"
        :class="[
          active ? 'bg-red-100 text-red-500' : 'text-gray-900',
        ]"
        @click="deleteEvent"
      >
        <ArchiveBoxIcon
          class="w-5 h-5 mr-2 text-red-500"
          aria-hidden="true"
        />
        Archiver
      </button>
    </MenuItem>
  </MenuItems>
</Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  ArchiveBoxIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/vue/24/outline'
import type { EventType } from '@/types'
import { ModalModeEnum, ModalNameEnum } from '@/types'
import { useAuthStore, useUiStore } from '~~/store'

interface Props {
  event: EventType
}

const props = defineProps<Props>()

const authStore = useAuthStore()
const uiStore = useUiStore()
const { setUiModal } = uiStore
const { syncEvent } = eventHook()

const isDeleted = computed(() => noNull(props.event.deletedAt) && noUndefined(props.event.deletedAt))

function addEmployeeToEvent() {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.ADD_EMPLOYEE,
    modalMode: ModalModeEnum.CREATE,
    data: {
      eventId: props.event.id,
    },
  })
}

function deleteEvent() {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.EVENT_FORM,
    modalMode: ModalModeEnum.DELETE,
    data: {
      event: props.event,
    },
  })
}
</script>
