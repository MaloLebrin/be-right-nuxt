<template>
<div class="relative flex flex-col p-2 bg-white shadow-md rounded-3xl shadow-black/5 ring-1 ring-black/5">
  <img
    v-if="post.mainImage"
    :alt="post.mainImage.alt ||
      'Image de couverture de l\'article ' + post.title"
    :src="post.mainImage.url"
    class="aspect-[3/2] w-full rounded-2xl object-cover">
  <div class="flex flex-col flex-1 p-8">
    <div class="text-gray-700 text-sm/5">
      {{ $toFormat(post.publishedAt, 'dddd, MMMM D, YYYY') }}
    </div>
    <div class="mt-2 font-medium text-base/7">
      <NuxtLink :to="`/blog/${post.slug}`">
        <span class="absolute inset-0" />
        {{post.title}}
      </NuxtLink>
    </div>
    <div class="flex-1 mt-2 text-gray-500 text-sm/6">
      {{post.excerpt}}
    </div>
    <div
      v-if="post.author"
      class="flex items-center gap-3 mt-6">
      <img
        :alt="`Avatar de l'auteur ${post.author.name}`"
        :src="post.author.image.url"
        class="object-cover rounded-full aspect-square size-6">
      <div class="text-gray-700 text-sm/5">
        {{ post.author.name }}
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import type { Post } from '~/types'
interface CardProps {
  post: Post
}

defineProps<CardProps>()
</script>
