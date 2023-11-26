<template>
<div class="flex items-center justify-between px-6 py-4 mb-2 space-y-1 overflow-hidden">
  <div class="overflow-hidden">
    <h4 class="overflow-hidden text-lg capitalize text">
      {{ event.name }}
    </h4>
    <time
      class="text-xs font-thin"
      :datetime="event.start as unknown as string"
    >
      {{ $toFormat(event.start, 'DD/MM/YY') }} - {{ $toFormat(event.end, 'DD/MM/YY') }}
    </time>
  </div>
  <NuxtLink
    :to="{ name: RouteNames.SHOW_EVENT_ID, params: { id: event.id } }"
    class="rounded-md bg-indigo-500 px-3 py-1.5 text-white"
  >
    Voir
  </NuxtLink>
</div>
</template>

<script setup lang="ts">
import { RouteNames } from '~~/helpers/routes'
import { type EventType } from '~~/store'

interface Props {
  event: EventType
}

defineProps<Props>()
</script>
