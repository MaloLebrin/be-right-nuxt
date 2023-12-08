<template>
<button
  class="relative flex justify-center item-center sm:col-start-3"
  @click="sendEvent"
>
  <div
    :class="`flex item-center justify-center p-2 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-${getStatusColor(status)}-50 hover:bg-${getStatusColor(status)}-100 border border-${getStatusColor(status)}-500 hover:border-${getStatusColor(status)}-700`"
  >
    <p
      :class="`text-${getStatusColor(status)}-500 group-hover:text-${getStatusColor(status)}-700 font-semibold uppercase`"
    >
      {{ getEventStatusTranslation(status) }}
    </p>
  </div>
</button>
</template>

<script setup lang="ts">
import type { EventStatusEnum } from '~~/types'

interface Props {
  status: EventStatusEnum
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const { getEventStatusTranslation, getStatusColor } = eventHook()

function sendEvent() {
  emit('click')
}
</script>
