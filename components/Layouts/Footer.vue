<template>
<footer class="bg-white border-t border-gray-100">
  <div class="px-6 py-10 mx-auto overflow-hidden max-w-7xl sm:py-24 lg:px-8">
    <nav
      class="-mb-6"
      aria-label="Footer"
    >
      <ul class="pb-6 sm:flex sm:justify-center sm:space-x-12">
        <li class="inline-block mt-2 mr-2 md:block md:mr-0">
          <NuxtLink
            :to="getLinkPath"
            class="text-sm leading-6 text-gray-600 hover:text-gray-900"
          >
            {{ authStore.getIsLoggedIn ? 'Mon compte' : 'Se connecter' }}
          </NuxtLink>
        </li>
        <li class="inline-block mt-2 mr-2 md:block md:mr-0">
          <NuxtLink
            v-if="!authStore.getIsLoggedIn"
            :to="{ name: 'register' }"
            class="text-sm leading-6 text-gray-600 hover:text-gray-900"
          >
            S'inscrire
          </NuxtLink>
          <p
            v-else
            class="text-sm leading-6 text-gray-600 hover:text-gray-900"
            @click="logout"
          >
            Se déconnecter
          </p>
        </li>
        <li class="inline-block mt-2 mr-2 md:block md:mr-0">
          <NuxtLink
            :to="{ name: 'index' }"
            class="text-sm leading-6 text-gray-600 hover:text-gray-900"
          >
            Accueil
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <p class="mt-10 text-xs leading-5 text-center text-gray-500">
      &copy; {{ `Be Right ${new Date().getFullYear()}` }}. All rights reserved. Designed by digital campus students.
    </p>
  </div>
</footer>
</template>

<script setup lang="ts">
import { useAuthStore } from '~~/store'

const authStore = useAuthStore()
const { logout } = authHook()

const getLinkPath = computed(() => {
  if (!authStore.getIsLoggedIn) {
    return { name: 'login' }
  }
  return { name: 'evenement' }
})
</script>
