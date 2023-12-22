<template>
<tr>
  <td class="py-2 text-sm font-medium text-gray-900 truncate md:py-4 whitespace-nowrap sm:pl-6">
    {{ event.id }}
  </td>
  <td class="py-2 pl-4 text-xs font-medium text-gray-900 truncate md:py-4 md:text-sm whitespace-nowrap">
    {{ event.name }}
  </td>
  <td class="px-3 py-2 text-sm text-gray-500 truncate md:py-4 whitespace-nowrap">
    <EventStatusTag :status="event.status" />
  </td>
  <td
    class="px-3 py-2 text-sm text-gray-500 truncate md:py-4 whitespace-nowrap"
  >
    {{ $toFormat(event.start, 'D/MM/YYYY') }}
  </td>
  <td
    v-show="$isNotMobile"
    class="px-3 py-2 text-sm text-gray-500 truncate md:py-4 whitespace-nowrap"
  >
    {{ $toFormat(event.end, 'D/MM/YYYY') }}
  </td>
  <td class="px-3 py-2 text-sm text-center text-gray-500 truncate md:py-4 whitespace-nowrap">
    {{ answers.filter(answer => isAnswerSigned(answer))?.length }} /{{ answers?.length }}
  </td>
  <td class="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
    <EventTableActionButton :event="event" />
  </td>
</tr>
</template>

<script setup lang="ts">
import EventTableActionButton from './ActionButton.vue'
import EventStatusTag from '~/components/Event/EventStatusTag.vue'
import type { EventType } from '@/types'
import { useAnswerStore } from '~/store'

interface Props {
  event: EventType
}

const props = defineProps<Props>()

const answerStore = useAnswerStore()
const { isAnswerSigned } = answerHook()

const answers = computed(() => answerStore.getManyByEventId(props.event.id))
</script>
