<template>
<section class="py-16 overflow-hidden blog">
  <ReadingProgress v-if="post" />
  <GradientBackground />
  <Container v-if="!post">
    <h2
      class-name="mt-16 font-mono text-xs/5 font-semibold uppercase tracking-widest text-gray-500 data-[dark]:text-gray-400">
      Blog</h2>
    <NoArticle />
  </Container>

  <Container v-else>
    <!-- Article Header -->
    <div class="max-w-3xl mx-auto">
      <Subheading
        v-if="post.publishedAt"
        additionnal-classes="mt-16">
        {{ $toFormat(post.publishedAt, 'dddd, MMMM D, YYYY') }}
      </Subheading>
      <h1 class="mt-2 text-pretty text-4xl font-medium tracking-tighter data-[dark]:text-white sm:text-5xl">
        {{ post?.title }}
      </h1>
      <p class="mt-6 text-xl text-gray-600">
        {{ post?.subtitle }}
      </p>

      <!-- Article Meta -->
      <div class="flex flex-col gap-4 mt-8">
        <div class="flex items-center gap-4 text-sm text-gray-600">
          <Author />
          <span>•</span>
          <span>{{ estimatedReadingTime }} min de lecture</span>
        </div>
        <BlogArticleCategoriesList :categories="post.categories" />
        <ShareButtons
          :url="articleUrl"
          :title="post.title"
          :description="post.shortDescription"
        />
      </div>

      <!-- Featured Image -->
      <img
        v-if="post.imageUrl"
        :src="`/${post.imageUrl}`"
        :alt="`Image de couverture de l'article ${post.title}`"
        class="w-full mt-8 rounded-2xl aspect-[16/9] object-cover bg-gray-50"
      >
    </div>

    <!-- Article Content -->
    <div class="relative max-w-6xl mx-auto mt-16">
      <div class="max-w-3xl mx-auto">
        <article class="prose prose-lg prose-gray">
          <ContentRenderer :value="post">
            <ContentRendererMarkdown :value="post" />
          </ContentRenderer>
        </article>
        <TableOfContents :headings="headings" />
      </div>
    </div>
  </Container>

  <!-- Similar Articles -->
  <Container
    v-if="similarPosts && similarPosts.length > 0"
    class-name="mt-16 pt-16 border-t border-gray-100">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-2xl font-medium tracking-tight text-gray-900">Articles similaires</h2>
      <BlogArticleListCards :posts="similarPosts" />
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
import TableOfContents from '~/components/blog/article/TableOfContents.vue'
import ReadingProgress from '~/components/blog/article/ReadingProgress.vue'
import ShareButtons from '~/components/blog/article/ShareButtons.vue'
import type { Post } from '~/types'

const { $getFrontUrl } = useNuxtApp()
const route = useRoute()
const slug = route.params.slug ? route.params.slug[0] : ''

const { data: post } = await useAsyncData<Post>('article', async () => await queryContent('/blog').where({ slug: slug }).findOne() as unknown as Post)
const { data: similarPosts } = await useAsyncData<Post[]>('similar-article', async () => await queryContent('/blog')
  .where({
    slug: {
      $ne: post.value?.slug
    },
    categories: {
      $in: post.value?.categories || []
    }
  }).find() as unknown as Post[])

const articleUrl = `${$getFrontUrl}${route.fullPath}`

// Estimated reading time calculation (based on average reading speed of 200 words per minute)
const estimatedReadingTime = computed(() => {
  if (!post.value?.description) return 1
  const wordCount = post.value.description.split(/\s+/).length
  return Math.ceil(wordCount / 200)
})

// Extract headings from content for table of contents
interface Heading {
  id: string
  text: string
  depth: number
}

const headings = ref<Heading[]>([])

onMounted(() => {
  const articleHeadings = document.querySelectorAll('article h2, article h3')
  headings.value = Array.from(articleHeadings)
    .map(heading => ({
      id: heading.id,
      text: heading.textContent || '',
      depth: parseInt(heading.tagName.charAt(1))
    }))
    .filter(heading => heading.text !== '')
})

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

<style>
.prose {
  @apply max-w-none;
}

.prose h2 {
  @apply text-2xl font-medium tracking-tight text-gray-900 mt-16 mb-6;
}

.prose h3 {
  @apply text-xl font-medium tracking-tight text-gray-900 mt-12 mb-4;
}

.prose p {
  @apply text-gray-600 leading-relaxed mb-6;
}

.prose ul {
  @apply list-disc pl-6 mb-6 text-gray-600;
}

.prose ol {
  @apply list-decimal pl-6 mb-6 text-gray-600;
}

.prose blockquote {
  @apply border-l-4 border-gray-200 pl-4 italic text-gray-600 my-6;
}

.prose a {
  @apply text-blue-600 hover:text-blue-800 transition-colors duration-200;
}

.prose img {
  @apply rounded-lg my-8;
}

.prose table {
  @apply w-full border-collapse my-8;
}

.prose th,
.prose td {
  @apply p-3 text-sm;
}

.prose th {
  @apply bg-gray-50 font-medium text-gray-900;
}

.prose code {
  @apply bg-gray-50 rounded px-1.5 py-0.5 text-sm font-mono text-gray-800;
}

.prose pre {
  @apply bg-gray-900 rounded-lg p-4 overflow-x-auto my-6;
}

.prose pre code {
  @apply bg-transparent text-gray-200 p-0;
}
</style>
