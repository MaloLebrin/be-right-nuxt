<template>
<div class="flex flex-col items-start gap-4">
  <h3 class="text-sm font-medium text-gray-900">Partager l'article</h3>
  <div class="flex items-center gap-3">
    <!-- Twitter/X -->
    <a
      :href="getTwitterShareUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200"
      title="Partager sur X (Twitter)"
    >
      <svg
        class="w-4 h-4"
        viewBox="0 0 24 24"
        fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    </a>

    <!-- LinkedIn -->
    <a
      :href="getLinkedInShareUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200"
      title="Partager sur LinkedIn"
    >
      <svg
        class="w-4 h-4"
        viewBox="0 0 24 24"
        fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </a>

    <!-- Facebook -->
    <a
      :href="getFacebookShareUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200"
      title="Partager sur Facebook"
    >
      <svg
        class="w-4 h-4"
        viewBox="0 0 24 24"
        fill="currentColor">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
      </svg>
    </a>

    <!-- Copy Link -->
    <button
      class="flex items-center justify-center w-8 h-8 text-gray-600 transition-colors bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200 group"
      title="Copier le lien"
      @click="copyToClipboard"
    >
      <LinkIcon
        class="w-4 h-4"
        :class="{ 'text-green-600': copied }"
      />
    </button>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LinkIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  url: string
  title: string
  description?: string
}>()

const copied = ref(false)

const getTwitterShareUrl = computed(() => {
  const params = new URLSearchParams({
    url: props.url,
    text: props.title
  })
  return `https://twitter.com/intent/tweet?${params.toString()}`
})

const getLinkedInShareUrl = computed(() => {
  const params = new URLSearchParams({
    url: props.url,
    title: props.title,
    summary: props.description || '',
    source: 'BeRight Blog'
  })
  return `https://www.linkedin.com/shareArticle?mini=true&${params.toString()}`
})

const getFacebookShareUrl = computed(() => {
  const params = new URLSearchParams({
    u: props.url
  })
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`
})

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.url)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script> 
