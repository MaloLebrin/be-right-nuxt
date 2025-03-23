<template>
<time
  :dateTime="new Date(date).toISOString()"
>
  {{ $toFormat(date, format) }}
</time>
</template>

<script setup lang="ts">
interface Props {
  date: string | Date
  format?: string
}

const { date, format } = withDefaults(defineProps<Props>(), {
  format: 'D/MM/YYYY',
})
</script>
