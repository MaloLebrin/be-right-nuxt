<template>
<ol
  class="overflow-hidden text-sm bg-white divide-y divide-gray-100 rounded-lg shadow ring-1 ring-black ring-opacity-5"
  role="list"
>
  <li
    v-for="event in events"
    :key="event.id"
    class="flex p-4 pr-6 group focus-within:bg-gray-50 hover:bg-gray-50"
    role="listitem"
  >
    <div class="flex-auto">
      <p class="font-semibold text-gray-900">
        {{ event.name }}
      </p>
      <time
        :datetime="event.start.toString()"
        class="flex items-center mt-2 text-gray-700"
      >
        <ClockIconOutline
          class="w-5 h-5 mr-2 text-gray-400"
          aria-hidden="true"
        />
        {{ $toFormat(event.start, 'DD MMMM YY') }}
      </time>
    </div>
    <NuxtLink
      role="link"
      :to="{
        name: RouteNames.SHOW_EVENT_ID,
        params: {
          id: event.id,
        },
      }"
      class="self-center flex-none px-3 py-2 ml-6 font-semibold text-indigo-500 bg-indigo-100 rounded-md shadow-sm ring-1 ring-inset ring-indigo-500"
    >
      Voir<span class="sr-only">, {{ event.name }}</span>
    </NuxtLink>
  </li>
</ol>
</template>

<script setup lang="ts">
import type { EventType } from '~~/types'
import { RouteNames } from '~~/helpers/routes'

interface Props {
  events: EventType[]
}

withDefaults(defineProps<Props>(), {
  events: () => [],
})
</script>
