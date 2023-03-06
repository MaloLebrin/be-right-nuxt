<template>
<tr>
  <td class="py-4 text-sm font-medium text-gray-900 truncate whitespace-nowrap sm:pl-6">
    {{ event.id }}
  </td>
  <td class="py-4 pl-4 text-sm font-medium text-gray-900 truncate whitespace-nowrap">
    {{ event.name }}
  </td>
  <td class="px-3 py-4 text-sm text-gray-500 truncate whitespace-nowrap">
    <EventStatusTag :status="event.status" />
  </td>
  <td class="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
    <NuxtLink
      class="flex items-center w-full px-2 py-2 text-sm rounded-md group"
      :to="{ name: 'evenement-show-id', params: { id: event.id } }"
      :data-cy="`event-${event.id}-show-link`"
    >
      <PencilSquareIconOutline
        class="w-5 h-5 mr-2 text-violet-400"
        aria-hidden="true"
      />
      Voir
    </NuxtLink>
  </td>
</tr>
</template>

<script setup lang="ts">
import type { EventType } from '@/types'

interface Props {
  event: EventType
}

defineProps<Props>()
</script>
