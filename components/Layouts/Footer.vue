<template>
<footer
  class="pb-8 bg-white border-t border-gray-100"
  aria-labelledby="footer-heading"
>
  <h2
    id="footer-heading"
    class="sr-only"
  >
    BeRight : Gérez en toute sécurité les autorisations d'image de vos
    employés
  </h2>
  <div class="xl:grid xl:grid-cols-3 xl:gap-8">
    <nav class="grid grid-cols-4 py-4 md:gap-8 xl:col-span-3 md:py-8">
      <NuxtLink
        :to="{ name: 'index' }"
        class="text-sm font-semibold leading-6 text-center text-gray-900 cursor-pointer"
      >
        Accueil
      </NuxtLink>
      <a
        href="#Solution"
        class="text-sm font-semibold leading-6 text-center text-gray-900 cursor-pointer"
      >
        Solution
      </a>
      <NuxtLink
        :to="{ name: 'blog' }"
        class="text-sm font-semibold leading-6 text-center text-gray-900 cursor-pointer"
      >
        Blog
      </NuxtLink>
      <NuxtLink
        v-if="!authStore.getIsLoggedIn"
        :to="{ name: 'login' }"
        class="text-sm font-semibold leading-6 text-center text-gray-900 cursor-pointer"
      >
        Se&nbsp;connecter
      </NuxtLink>
      <p
        v-else
        class="text-sm font-semibold leading-6 text-center text-gray-900 cursor-pointer"
        @click="logout"
      >
        Se déconnecter
      </p>
    </nav>
  </div>
  <div class="px-4 py-4 border-t md:py-8 border-gray-900/10 md:flex md:items-center md:justify-evenly md:px-0">
    <div>
      <h3 class="text-sm font-semibold leading-6 text-gray-900">
        Abonnez-vous !
      </h3>
      <p class="mt-2 text-sm leading-6 text-gray-600">
        Restez au courant des nouveautés !
      </p>
    </div>
    <NewsletterForm />
  </div>
  <div class="py-4 border-t md:py-8 border-gray-900/10 md:flex md:items-center md:justify-evenly">
    <p class="text-xs leading-5 text-center text-gray-500 md:order-1 md:mt-0">
      &copy; {{ `Be Right ${new Date().getFullYear()}` }}. All rights reserved. Designed by digital campus students.
    </p>
  </div>
</footer>
</template>

<script setup lang="ts">
import { useAuthStore } from '~~/store'
import NewsletterForm from '~~/components/Newsletter/NewsletterForm.vue'

const authStore = useAuthStore()
const { logout } = authHook()
</script>
