<template>
<BaseLoadingIndicator
  :is-loading="uiStore.getUIIsLoading"
  :message="uiStore.loadingMessage"
  additional-class="fixed z-50 transform -translate-x-1/2 bottom-4 left-1/2"
/>
</template>

<script setup lang="ts">
import { useUiStore } from '~~/store'

const uiStore = useUiStore()
</script>
