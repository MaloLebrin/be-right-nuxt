<template>
<tr>
  <th
    scope="col"
    class="py-3.5 pl-2 inline-flex group truncate text-left text-sm font-semibold text-gray-900 sm:pl-4"
  >
    Id
  </th>
  <th
    scope="col"
    class="py-3.5 pl-2 text-left text-sm font-semibold text-gray-900 sm:pl-4"
  >
    <span
      class="inline-flex truncate group"
    >
      Notification
    </span>
  </th>
  <th
    scope="col"
    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
  >
    <span
      class="inline-flex truncate group"
    >
      Créée le
    </span>
  </th>
  <th
    scope="col"
    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
  >
    <span
      class="inline-flex truncate group"
    >
      État
    </span>
  </th>
  <th
    scope="col"
    class="relative py-3.5 pl-3 pr-4 sm:pr-6"
  >
    <span class="sr-only">Actions</span>
    <Switch
      v-model="isDisplayingUnread"
      :class="isDisplayingUnread ? 'bg-green-500' : 'bg-gray-200'"
      class="relative inline-flex items-center h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
      title="Afficher les notifications non lues"
    >
      <span class="hidden text-xs">{{ isDisplayingUnread ? 'Non lues' : 'Toutes' }}</span>
      <span
        aria-hidden="true"
        :class="isDisplayingUnread ? 'translate-x-6' : 'translate-x-0'"
        class="inline-block w-4 h-4 transition duration-200 ease-in-out transform bg-white rounded-full shadow-lg pointer-events-none ring-0"
      />
    </Switch>
  </th>
</tr>
</template>

<script setup lang="ts">
import { Switch } from '@headlessui/vue'
import { useNotificationsStore } from '~~/store'

const notificationStore = useNotificationsStore()
const { toggleUnReadSetting } = notificationStore

const isDisplayingUnread = computed({
  get: () => notificationStore.getDisplayUnRead,
  set: value => toggleUnReadSetting(value),
})
</script>
