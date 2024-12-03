<template>
<section
  id="Solution"
>
  <div class="px-6 mx-auto mt-4 lg:mt-10 max-w-7xl lg:px-8">
    <div class="max-w-2xl mx-auto sm:text-center">
      <h2 class="text-base font-semibold leading-7 text-indigo-600">
        Tout ce dont vous avez besoin
      </h2>
      <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Marre d'imprimer et de scanner vos documents de droits à l'image?
      </p>
      <p class="mt-6 text-lg leading-8 text-gray-600">
        BeRight envoie automatiquement la demande de droit à l'image à vos clients, puis reçoit le document signé directement sur la plateforme.
      </p>
    </div>
  </div>
  <div class="relative pt-16 overflow-hidden">
    <div class="px-6 mx-auto max-w-7xl lg:px-8">
      <img
        src="/eventSceenShot.webp"
        alt="catpure d'écran de l'application BeRight"
        class="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
        width="2432"
        height="1442"
      >
      <div
        class="relative"
        aria-hidden="true"
      >
        <div class="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
      </div>
    </div>
  </div>
  <div class="px-6 mx-auto mt-16 max-w-7xl sm:mt-20 md:mt-24 lg:px-8">
    <dl class="grid max-w-2xl grid-cols-1 mx-auto text-base leading-7 text-gray-600 gap-x-6 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
      <Features />
    </dl>
  </div>
</section>
</template>

<script setup lang="ts">
import Features from './Features.server.vue'
</script>
