<template>
<div class="flex items-start h-full">
  <li
    v-for="(event, eventIndex) in events.slice(0, 2)"
    :key="`${event.id}-${day.date}`"
    class="relative grid grid-cols-1"
    :class="[
      `h-full max-h-${getHeight(event)}px mt-${getStart(event)}px`,
      { 'pl-1': (index === 0 && eventIndex === 0) },
      { 'w-1/2': events.slice(0, 2).length > 1 },
    ]">
    <NuxtLink
      :to="{ name: RouteNames.SHOW_EVENT_ID, params: { id: event.id } }"
      class="flex flex-col p-2 overflow-y-auto text-xs leading-5 border rounded-lg bg-opacity-10 group inset-1"
      :class="getBG(event.status)">
      <p>
        <span
          v-if="isAllDay(event)"
          class="truncate">Jour entier</span>
        <time
          v-else
          :datetime="event.start.toString()">{{ $toFormat(event.start, 'HH:00') }}</time>
      </p>
      <p class="font-semibold">
        {{ event.name }}
      </p>
    </NuxtLink>
  </li>
</div>
</template>

<script setup lang="ts">
import type { EventType } from '~~/types'
import { EventStatusEnum } from '~~/types'
import { RouteNames } from '~~/helpers/routes'
import type { CalendarDay } from '~~/store/calendar/'

interface Props {
  events: EventType[]
  day: CalendarDay
  previousDay: CalendarDay
  nextDay: CalendarDay
  index: number
}

const props = defineProps<Props>()
const { isPeriodInDay, getHour } = dateHook()

function isAllDay(event: EventType) {
  return isPeriodInDay({
    start: event.start,
    end: event.end,
  }, props.day.date)
}

const multiplicator = 288 / 24

function getHeight(event: EventType) {
  if (isAllDay(event)) {
    return 288
  }
  return Math.abs(getHour(event.start) - getHour(event.end)) * multiplicator
}

function getStart(event: EventType) {
  if (isAllDay(event)) {
    return 1
  }
  return getHour(event.start) * multiplicator
}

function getBG(status: EventStatusEnum) {
  switch (status) {
    case EventStatusEnum.CLOSED:
      return 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-500 group-hover:text-gray-700'
    case EventStatusEnum.CREATE:
      return 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-500 group-hover:text-blue-700'
    case EventStatusEnum.COMPLETED:
      return 'border-green-200 bg-green-50 hover:bg-green-100 text-green-500 group-hover:text-green-700'
    case EventStatusEnum.PENDING:
      return 'border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-500 group-hover:text-orange-700'
    default:
      return 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-500 group-hover:text-gray-700'
  }
}
</script>
