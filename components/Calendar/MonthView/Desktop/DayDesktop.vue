<template>
<div
  class="relative px-3 py-2"
  :class="[isInCurrentMonth(day.date) ? 'bg-white' : 'bg-gray-50 text-gray-500']"
>
  <time
    :datetime="day.date as unknown as string"
    class="cursor-pointer"
    :class="[
      { 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white': isToday(day.date) },
      { 'flex h-6 w-6 items-center justify-center rounded-full bg-orange-600 font-semibold text-white': calendarStore.isSelectedDay(day) },
    ]"
    @click="setSelectedDay(day)"
  >{{ $toFormat(day.date, 'DD') }}</time>
  <ol
    v-if="events.length > 0"
    class="mt-2"
  >
    <li
      v-for="event in events.slice(0, 2)"
      :key="event.id"
    >
      <NuxtLink
        :to="{ name: RouteNames.SHOW_EVENT_ID, params: { id: event.id } }"
        class="flex group"
      >
        <p class="flex-auto font-medium text-gray-900 truncate group-hover:text-indigo-600">
          {{ event.name }}
        </p>
        <time
          :datetime="event.start as unknown as string"
          class="flex-none hidden ml-3 text-gray-500 group-hover:text-indigo-600 xl:block"
        >{{ $toFormat(event.start, 'DD MM') }} - {{ $toFormat(event.end, 'DD MM') }}</time>
      </NuxtLink>
    </li>
    <li
      v-if="day.eventIds.length > 2"
      class="text-gray-500"
    >
      + {{ day.eventIds.length - 2 }} more
    </li>
  </ol>
</div>
</template>

<script setup lang="ts">
import {
  type CalendarDay,
  useCalendarStore,
  useEventStore,
} from '~~/store'
import { RouteNames } from '~~/helpers/routes'

interface Props {
  day: CalendarDay
}

const props = defineProps<Props>()

const eventStore = useEventStore()
const calendarStore = useCalendarStore()
const { setSelectedDay } = calendarStore
const { isToday, isInCurrentMonth } = dateHook()

const events = eventStore.getMany(props.day.eventIds)
</script>
