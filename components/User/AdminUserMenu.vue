<template>
<nav class="flex mt-1 overflow-x-auto md:mt-2">
  <ul
    role="list"
    class="flex flex-none min-w-full px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
  >
    <template v-if="routeParams.id">
      <li
        v-for="item in menu"
        :key="item.name"
      >
        <NuxtLink
          :to="{
            name: item.name,
            params: {
              id: routeParams.id,
            },
            query: $route.query,
          }"
          class="flex items-center p-3 text-sm font-medium border border-transparent rounded-md group hover:bg-orange-200"
          :class="[
            $route.name === item.name ? 'bg-gray-50 text-orange-600 hover:bg-white' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
            { 'cursor-not-allowed opacity-50': item.disabled },
          ]"
          :aria-current="$route.name === item.name ? 'page' : undefined"
          :disabled="item.disabled"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </template>
  </ul>
</nav>
</template>

<script setup lang="ts">
import { RouteNames } from '~~/helpers/routes'

const $route = useRoute()

const routeParams = computed(() => $route.params as { id: string })

const menu = [
  {
    label: 'Profile',
    name: RouteNames.ADMIN_USER_SHOW_ACCOUNT,
    disabled: false,
  },
  {
    label: 'Événements',
    name: RouteNames.ADMIN_USER_SHOW_EVENTS,
    disabled: false,
  },
  {
    label: 'Destinataires',
    name: RouteNames.ADMIN_USER_SHOW_EMPLOYEES,
    disabled: false,
  },
  {
    label: 'Settings',
    name: RouteNames.ADMIN_USER_SHOW_SETTINGS,
    disabled: false,
  },
]
</script>
