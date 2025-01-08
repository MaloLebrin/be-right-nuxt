<template>
<ul class="grid grid-cols-1 gap-8 mt-6 lg:grid-cols-3">
  <li
    v-for="post in posts"
    :key="post.slug">
    <Card :post="post" />
  </li>
</ul>
</template>

<script setup lang="ts">
import Card from './Card.vue'
import type { Post } from '~/types'

interface ListCardsProps {
  posts: Post[]
}

withDefaults(defineProps<ListCardsProps>(), {
  posts: () => []
})
</script>
