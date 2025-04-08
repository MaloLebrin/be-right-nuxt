<template>
<section class="py-16 overflow-hidden">
  <GradientBackground />
  <Container>
    <div class="max-w-3xl mx-auto">
      <h2 class="mt-16 font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">
        Blog
      </h2>
      <div class="flex items-center gap-3 mt-4">
        <component
          :is="getCategoryIcon(category.slug)"
          class="w-8 h-8 text-gray-600"
        />
        <h1 class="text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-5xl">
          {{ category.title }}
        </h1>
      </div>
      <p class="mt-6 text-xl text-gray-600">
        {{ category.description }}
      </p>

      <div class="flex items-center gap-4 mt-8 text-sm text-gray-600">
        <div class="flex items-center gap-2">
          <DocumentTextIcon class="w-4 h-4" />
          {{ data?.length || 0 }} article{{ data?.length !== 1 ? 's' : '' }}
        </div>
        <NuxtLink
          to="/blog/categories"
          class="flex items-center gap-1 text-blue-600 transition-colors hover:text-blue-800"
        >
          <ArrowLeftIcon class="w-4 h-4" />
          Toutes les catégories
        </NuxtLink>
      </div>
    </div>
  </Container>
  
  <Container class-name="mt-16 pb-24">
    <div class="max-w-3xl mx-auto">
      <template v-if="data && data.length > 0">
        <BlogArticleListCards :posts="data" />
      </template>
      <NoArticle v-else />
    </div>
  </Container>
</section>
</template>
    
<script setup lang="ts">
import { DocumentTextIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
import Container from '~/components/blog/Container.vue'
import NoArticle from '~/components/blog/NoArticle.vue'
import GradientBackground from '~/components/blog/GradientBackground.vue'
import type { CategorySlug, Post } from '~/types'
import { getCategoryIcon } from '~/utils/blog'
  
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
  title: `${category.title} - Blog`,
  description: category.description,
  articleTag: ["droits à l'image", "signature électronique"],
  ogTitle: category.title,
  ogDescription: category.description,
  ogLocale: 'fr_FR',
})
</script>
    