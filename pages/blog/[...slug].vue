<template>
<!-- <Container class-name="mt-16 pb-24">
  <template v-if="post">
    <ContentRenderer :value="post">
      <h1>{{ post.title }}</h1>
      <ContentRendererMarkdown :value="post" />
    </ContentRenderer>
  </template>
  <NoArticle v-else />

  <ContentDoc>
    <template #not-found>
      <NoArticle />
    </template>

    <template #default="{ doc }">
      <p class="article-date">{{ doc.date }}</p>
      <h1 class="article-title">{{ doc.title }}</h1>
      <ContentRenderer
        :value="doc"
        class="page-formating" />
    </template>
  </ContentDoc>
</Container> -->
<ContentDoc />
</template>

<script setup lang="ts">
// import Container from '~/components/blog/Container.vue'
// import NoArticle from '~/components/blog/NoArticle.vue'

</script>
