<template>
<section class="py-16 overflow-hidden blog">
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
      class="mt-2 text-pretty text-4xl font-medium tracking-tighter data-[dark]:text-white sm:text-6xl">
      {{ post?.title }}
    </h1>
    <p class="max-w-3xl mt-6 text-2xl font-medium text-gray-500">
      {{ post?.subtitle }}
    </p>

    <div class="grid grid-cols-1 gap-8 mt-16">
      <div class="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start lg:space-y-4">
        <Author />
        <BlogArticleCategoriesList
          :categories="post.categories"
        />
        <article class="text-slate-800">
          <ContentRenderer
            :value="post"
            class="max-w-2xl mx-auto">
            <ContentRendererMarkdown :value="post" />
          </ContentRenderer>
        </article>
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

const { $getFrontUrl } = useNuxtApp()
const route = useRoute()
const slug = route.params.slug ? route.params.slug[0] : ''

const { data: post } = await useAsyncData<Post>('', async () => await queryContent('/blog').where({ slug: slug }).findOne() as unknown as Post)

const articleUrl = `${$getFrontUrl}${route.fullPath}`

useSeoMeta({
  title: `${post.value?.title} - Blog`,
  description: post.value?.shortDescription,
  ogImage: `${$getFrontUrl}/${post.value?.imageUrl}`,
  ogImageAlt: `Image de couverture de l'article ${post.value?.title}`,
  author: 'Malo Lebrin',
  articleModifiedTime: post.value?.publishedAt,
  articlePublishedTime: post.value?.publishedAt,
  articleTag: ["droits à l'image", "signature électronique"],
  ogUrl: articleUrl,
  ogTitle: post.value?.title,
  ogDescription: post.value?.shortDescription,
  ogType: 'article',
  ogLocale: 'fr_FR',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: articleUrl,
    }
  ]
})
</script>

<style module>
article > div > p {
  @apply my-6 text-base/8 first:mt-0 last:mb-0
}

article > div > h2 {
  @apply mb-6 mt-12 text-2xl/8 font-medium tracking-tight first:mt-0 last:mb-0
}

article > div > h3 {
  @apply mb-6 mt-12 text-xl/8 font-medium tracking-tight first:mt-0 last:mb-0
}

article > div > blockquote {
  @apply my-6 border-l-2 border-l-gray-300 pl-6 text-base/8 first:mt-0 last:mb-0
}

article > div > hr {
  @apply my-8 border-t border-gray-200
}

article > div > .space {
  @apply my-8
}

article > div > ul {
  @apply list-disc pl-4 text-base/8 marker:text-gray-400
}

article > div > ol {
  @apply list-decimal pl-4 text-base/8 marker:text-gray-400
}

article > div > li {
  @apply my-2 pl-2 has-[br]:mb-8
}

article > div > strong {
  @apply font-semibold
}

article > div > a {
  @apply font-medium underline decoration-gray-400 underline-offset-4 data-[hover]:decoration-gray-600
}
</style>
