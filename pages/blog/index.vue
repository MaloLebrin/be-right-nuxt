<template>
<section class="py-16 overflow-hidden">
  <GradientBackground />
  <Container>
    <h2 class-name="mt-16 font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">Blog</h2>
    <h1
      class="mt-2 text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-6xl">
      Le blog spécialisé dans la gestion des droits à l'image
    </h1>
  </Container>

  <Container
    class-name="mt-16 pb-24">
    <CategoriesList :categories="categoryArray" />
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
import CategoriesList from '~/components/blog/article/CategoriesList.vue'
import GradientBackground from '~/components/blog/GradientBackground.vue'
import type { Post } from '~/types';
  
const { data } = await useAsyncData<Post[]>('', async () => await queryContent('/blog').find() as unknown as Post[])
</script>
  