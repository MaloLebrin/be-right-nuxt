<template>
<section class="py-16 overflow-hidden">
  <GradientBackground />
  <Container v-if="!post">
    <h2
      class-name="mt-16 font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">
      Blog</h2>
    <NoArticle />
  </Container>
  <Container v-else>
    <Subheading
      v-if="post.publishedAt"
      additionnal-classes="mt-16">
      {{ $toFormat(post.publishedAt, 'dddd, MMMM D, YYYY') }}
    </Subheading>
    <h1
      class="mt-2 text-pretty text-4xl font-medium tracking-tighter text-gray-950 data-[dark]:text-white sm:text-6xl">
      {{ post?.title }}
    </h1>
    <p class="max-w-3xl mt-6 text-2xl font-medium text-gray-500">
      {{ post?.subtitle }}
    </p>

    <div className="mt-16 grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
      <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
        <Author />
        <BlogArticleCategoriesList :categories="post.categories" />
      </div>
    </div>
  </Container>
</section>
</template>

<script setup lang="ts">
import Container from '~/components/blog/Container.vue'
import NoArticle from '~/components/blog/NoArticle.vue'
import GradientBackground from '~/components/blog/GradientBackground.vue'
import Subheading from '~/components/blog/article/SubHeading.vue'
import Author from '~/components/blog/article/Author.vue'
import type { Post } from '~/types'

const route = useRoute()
const slug = route.params.slug ? route.params.slug[0] : ''

const { data: post } = await useAsyncData<Post>('', async () => await queryContent('/blog').where({ slug: slug }).findOne() as unknown as Post)

useSeoMeta({
  title: post.value?.title,
  description: post.value?.shortDescription,
  ogImage: post.value?.imageUrl,
  ogImageAlt: `Image de couverture de l'article ${post.value?.title}`,
  author: 'Malo Lebrin',
  articleModifiedTime: post.value?.publishedAt,
  articlePublishedTime: post.value?.publishedAt,
  articleTag: [] // FIXME: Add tags
  // ogUrl: `https://www.alexandrerenaud.ca/blog/${slug}`, FIXME Not working 
  // url: `https://www.alexandrerenaud.ca/blog/${slug}` // FIXME: Not working
})
</script>
