<template>
<NuxtLink
  :to="{ name: RouteNames.SHOW_EVENT_ID, params: { id: props.event.id } }"
  class="flex items-center justify-between px-2 py-2 space-x-2 border border-separate border-indigo-200 rounded-md"
>
  <span class="w-1/2 truncate">{{ event.name }}</span>
  <EventStatusTag :status="event.status" />
  <span>{{ answers.filter(answer => isAnswerSigned(answer))?.length }}/{{ answers?.length }}</span>
</NuxtLink>
</template>

<script setup lang="ts">
import EventStatusTag from './EventStatusTag.vue'
import type { EventType } from '~~/types'
import { useAnswerStore } from '~/store'
import { RouteNames } from '~~/helpers/routes'
import { isAnswerSigned } from '~/utils/answer'

interface Props {
  event: EventType
}

const props = defineProps<Props>()

const answerStore = useAnswerStore()

const answers = computed(() => answerStore.getManyByEventId(props.event.id))
</script>
