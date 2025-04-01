<template>
<div class="flex flex-wrap flex-1 py-1 space-x-2">
  <p
    v-for="suggest in suggestions"
    :key="suggest"
    class="text-sm text-gray-500 hover:text-orange-500 hover:cursor-pointer hover:underline"
    @click="handleSuggestionClick(suggest)"
  >
    {{ suggest }}
  </p>
</div>
</template>

<script setup lang="ts">
import { multipleEmailSuggestions } from '~/utils/email'

interface Props {
  firstName: string
  lastName: string
  email: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'select', value: string): void
}>()

const suggestions = computed(() => 
  multipleEmailSuggestions({
    firstName: props.firstName,
    lastName: props.lastName,
    email: props.email || '',
  })
)

const handleSuggestionClick = (suggestion: string) => {
  emit('select', suggestion)
}
</script> 
