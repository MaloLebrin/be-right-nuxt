<template>
<section class="py-16 overflow-hidden">
  <GradientBackground />
  <Container>
    <h2 class-name="mt-16 font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">Blog</h2>
    <h1
      class="mt-2 text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-6xl">
      What’s happening at Radiant.
    </h1>
    <p class="max-w-3xl mt-6 text-2xl font-medium text-gray-500">
      Stay informed with product updates, company news, and insights on how
      to sell smarter at your company.
    </p>
  </Container>
  <!-- {page === 1 && !category && <FeaturedPosts />} -->
  <Container class-name="mt-16 pb-24">
    bl
  <!-- <Categories selected={category} />
        <Posts page={page} category={category} />
        <Pagination page={page} category={category} /> -->
  </Container>
</section>
</template>
    
<script setup lang="ts">
import Container from '~/components/blog/Container.vue'
import GradientBackground from '~/components/blog/GradientBackground.vue'

useServerSeoMeta({
  title: 'BeRight Blog',
  description: 'Gérez enfin le droit à l\'image de vos clients facilement !',
  ogTitle: 'BeRight Blog',
  ogDescription: 'Gérez enfin le droit à l\'image de vos clients facilement !',
  ogUrl: 'https://be-right.co/blog',
  ogLocale: 'fr_FR',
  ogType: 'website',
    
})
</script>
    