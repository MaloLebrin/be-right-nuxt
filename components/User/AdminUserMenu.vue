<template>
<nav class="flex overflow-x-auto border-b border-white/5">
  <ul
    role="list"
    class="flex flex-none min-w-full px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
  >
    <template v-if="$route.params.id">
      <li
        v-for="item in menu"
        :key="item.name"
      >
        <NuxtLink
          :to="{
            name: item.name,
            params: {
              id: $route.params.id,
            },
            query: $route.query,
          }"
          class="flex items-center p-3 text-sm font-medium rounded-md group"
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
const menu = [
  {
    label: 'Profile',
    name: 'admin-user-show-id-account',
    disabled: false,
  },
  {
    label: 'Événements',
    name: 'admin-user-show-id-evenements',
    disabled: false,
  },
  {
    label: 'Destinataires',
    name: 'admin-user-show-id-destinataires',
    disabled: false,
  },
  {
    label: 'Settings',
    name: 'admin-user-show-id-account',
    disabled: true,
  },
]
</script>
