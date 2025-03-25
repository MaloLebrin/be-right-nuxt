<template>
<PageAuthWrapper>
  <div class="container flex px-4 py-4 mx-auto mb-8 lg:px-8 xl:max-w-[1100px]">
    <EventFormStep1 class="px-4 lg:px-8" />
  </div>
</PageAuthWrapper>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'create-event-layout',
  isAuth: true,
  middleware: ['guards-middleware'],
})
</script>
