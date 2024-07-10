<template>
<section>
  <div class="px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Prêt à gagner du temps ?
    </h2>
    <div class="flex items-center mt-10 gap-x-6 lg:mt-0 lg:flex-shrink-0">
      <NuxtLink
        type="button"
        title="commencer"
        name="commencer"
        class="px-4 py-2 mx-auto font-bold text-white transition duration-300 ease-in-out transform bg-indigo-600 shadow-lg md:px-8 md:py-4 rounded-xl md:my-6 ms:block lg:mx-0 hover:underline focus:outline-none focus:shadow-outline hover:-translate-y-2 hover:scale-105"
        :to="{ name: 'register' }"
      >
        Commencez
      </NuxtLink>
      <NuxtLink
        :to="{ name: 'login' }"
        class="text-sm font-semibold leading-6 text-gray-900"
      >
        Se connecter <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>
  </div>
</section>
</template>
