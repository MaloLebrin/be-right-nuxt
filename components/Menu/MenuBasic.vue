<template>
<nav
  class="mt-5 space-y-6"
  role="menu"
>
  <ul
    role="list"
    class="space-y-2"
  >
    <MenuRecursiveList
      :menu-items="authStore.isAuthUserAdmin ? ADMIN_MENU_ITEMS : MENU_ITEMS"
      ul
    />

    <!-- <Tricks v-if="!authStore.isAuthUserAdmin" /> -->
  </ul>
</nav>
</template>

<script setup lang="ts">
import { ADMIN_MENU_ITEMS, MENU_ITEMS } from '~~/helpers/menu'
import { useAuthStore } from '~~/store/auth'
import MenuRecursiveList from '~/components/Menu/MenuRecursiveList.vue'

const authStore = useAuthStore()
</script>
