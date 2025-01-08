<template>
<section class="bg-white">
  <div class="relative overflow-x-visible isolate bg-gradient-to-b from-indigo-100/20">
    <div class="container px-5 pt-10 pb-24 mx-auto max-w-7xl sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:py-40">
      <div class="px-6 lg:px-0 lg:pt-4">
        <div class="max-w-2xl mx-auto">
          <div class="max-w-lg">
            <h1 class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              BeRight: Révolutionnez votre gestion des droits à l'image
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              Gérez en toute sécurité les autorisations d'image de vos
              employés
            </p>
            <div class="flex items-center mt-6 gap-x-6">
              <NuxtLink
                type="button"
                title="Commencez"
                name="commencer"
                class="px-4 py-2 mx-auto font-bold text-white transition duration-300 ease-in-out transform bg-indigo-600 shadow-lg md:px-8 md:py-4 rounded-xl md:my-6 ms:block lg:mx-0 hover:underline focus:outline-none focus:shadow-outline hover:-translate-y-2 hover:scale-105"
                :to="{ name: 'login' }"
              >
                Commencez
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:-mx-5 lg:mt-0 lg:w-full">
        <div
          class="absolute overflow-x-visible inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
          aria-hidden="true"
        />
        <img
          src="/homeScreenshot.webp"
          alt="Capture d'écran de l'application"
          class="object-cover h-full shadow-lg rounded-3xl"
        >
      </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 h-24 overflow-x-visible -z-10 bg-gradient-to-t from-white sm:h-32" />
  </div>
</section>
</template>
