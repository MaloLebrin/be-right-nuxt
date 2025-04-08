<template>
<aside class="sticky hidden top-8 lg:block">
  <h2 class="text-sm font-semibold text-gray-900">Table des matières</h2>
  <nav class="mt-4">
    <ul class="space-y-3 text-sm">
      <li
        v-for="(heading, index) in headings"
        :key="index">
        <a
          :href="`#${heading.id}`"
          :class="[
            'block text-gray-500 hover:text-gray-900 transition-colors duration-200',
            { 'pl-4': heading.depth > 2 },
            { 'font-medium': heading.depth === 2 }
          ]"
          @click.prevent="scrollToHeading(heading.id)">
          {{ heading.text }}
        </a>
      </li>
    </ul>
  </nav>
</aside>
</template>

<script setup lang="ts">
interface Heading {
  id: string
  text: string
  depth: number
}

defineProps<{
  headings: Heading[]
}>()

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script> 
