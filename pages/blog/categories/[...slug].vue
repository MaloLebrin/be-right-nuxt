<template>
<section class="py-16 overflow-hidden">
  <GradientBackground />
  <Container>
    <h2 class="mt-16 font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">Blog</h2>
    <h1
      class="mt-2 text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-6xl">
      Les articles de la catégorie {{ category.title }}
    </h1>
    <p class="max-w-3xl mt-6 text-2xl font-medium text-gray-500">
      {{ category.description }}
    </p>
  </Container>
  
  <Container
    class-name="mt-16 pb-24">
    <template v-if="data && data.length > 0">
      <BlogArticleListCards :posts="data" />
    </template>
    <NoArticle v-else />
  </Container>
</section>
</template>
    
<script setup lang="ts">
import Container from '~/components/blog/Container.vue'
import NoArticle from '~/components/blog/NoArticle.vue'
import GradientBackground from '~/components/blog/GradientBackground.vue'
import type { CategorySlug, Post } from '~/types';
  
const route = useRoute()
const slug = route.params.slug ? route.params.slug[0] : ''

const { data } = await useAsyncData<Post[]>('category', async () => await queryContent('/blog')
  .where({
    categories: {
      $in: [slug]
    }
  }).find() as unknown as Post[])

const category = getArticleCategories([slug as CategorySlug])[0]

useSeoMeta({
  title: `Blog - ${category.title}`,
  description: category.description,
  articleTag: ["droits à l'image", "signature électronique"],
  ogTitle: category.title,
  ogDescription: category.description,
  ogLocale: 'fr_FR',
})
</script>
    