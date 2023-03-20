<template>
<aside class="px-2 py-6 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
  <nav class="space-y-1">
    <a
      v-for="item in subNavigation"
      :key="item.name"
      :href="item.href"
      class="flex items-center px-3 py-2 text-sm font-medium rounded-md group"
      :class="[item.current ? 'bg-gray-50 text-orange-600 hover:bg-white' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900']"
      :aria-current="item.current ? 'page' : undefined"
    >
      <component
        :is="item.icon"
        class="flex-shrink-0 w-6 h-6 mr-3 -ml-1"
        :class="[item.current ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-500']"
        aria-hidden="true"
      />
      <span class="truncate">{{ item.name }}</span>
    </a>
  </nav>
</aside>
</template>

<script setup lang="ts">
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'

const subNavigation = [

  { name: 'Profile', href: '#', icon: UserCircleIcon, current: false },
  { name: 'Account', href: '#', icon: CogIcon, current: false },
  { name: 'Password', href: '#', icon: KeyIcon, current: false },
  { name: 'Notifications', href: '#', icon: BellIcon, current: false },
  { name: 'Plan & Billing', href: '#', icon: CreditCardIcon, current: true },
]
</script>
