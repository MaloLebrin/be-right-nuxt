<template>
<time :datetime="formatDate(date)">{{ $toFormat(new Date(date), 'DD-MM-YY à HH:mm') }}</time>
</template>

<script setup lang="ts">
import { isString } from '@antfu/utils'

interface Props {
  date: string | Date | number
}

const { date } = defineProps<Props>()

function formatDate(dateToFormat: Props['date']) {
  if (dateToFormat instanceof Date) {
    return dateToFormat.toLocaleDateString()
  }

  if (isString(dateToFormat)) {
    return dateToFormat
  }

  if (isNumber(dateToFormat)) {
    return new Date(dateToFormat).toLocaleDateString()
  }
}
</script>
