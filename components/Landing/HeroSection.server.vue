<template>
<section class="container relative pt-10 md:mx-auto">
  <div class="grid items-center justify-center grid-cols-1 gap-4 md:grid-cols-2 md:flex-row DarkModeAnimation">
    <div class="z-10 flex flex-col items-center justify-center mx-auto sm:text-gray-800">
      <h1
        class="my-4 text-2xl font-bold text-center md:text-left md:text-5xl md:leading-snug dark:text-gray-100"
      >
        Gérez enfin le droit à l'image de vos clients facilement !
      </h1>
      <p
        class="mb-8 text-lg leading-normal text-center md:text-left md:text-2xl dark:text-gray-400"
      >
        Commencez maintenant avec un mois gratuit.
      </p>
      <NuxtLink
        type="button"
        title="commencer"
        name="commencer"
        class="px-4 py-2 mx-auto font-bold text-white transition duration-300 ease-in-out transform bg-indigo-600 shadow-lg md:px-8 md:py-4 rounded-xl md:my-6 ms:block lg:mx-0 hover:underline focus:outline-none focus:shadow-outline hover:-translate-y-2 hover:scale-105"
        :to="{ name: 'login' }"
      >
        Commencez
      </NuxtLink>
    </div>

    <div
      v-if="$isNotMobile"
      class="absolute inset-0 z-0 bg-transparent md:shadow-xl sm:z-50 sm:rounded-lg md:static"
    >
      <NuxtImg
        class="z-0 w-full duration-300 ease-in-out transform opacity-50 sm:opacity-100 sm:rounded-lg sm:z-50 sm:hover:-translate-x-1"
        src="/img/hero-image.webp"
        width="5674"
        height="3840"
        sizes="xs:200px md:500px lg:1024"
        alt="photographe qui prend des photos"
      />
    </div>
  </div>
</section>
</template>

<script setup lang="ts">
const { $isNotMobile } = useNuxtApp()
</script>
