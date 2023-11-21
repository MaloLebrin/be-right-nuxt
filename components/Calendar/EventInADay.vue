<template>
<li
  class="relative flex mt-px"
  :class="`sm:col-start-${index}`"
  :style="`grid-row: ${getStart()} / span ${getHeight()}`"
>
  <!-- span c'est la hateur une heure = 5 300 === All day -->
  <!-- grid-row c'est la position dans le jour 01 === 00H00 -->
  <!-- col-start-3 le number est le jour -->
  <NuxtLink
    :to="{ name: RouteNames.SHOW_EVENT_ID, params: { id: event.id } }"
    class="absolute flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-blue-50 hover:bg-blue-100"
  >
    <p class="order-1 font-semibold text-blue-700">
      {{ event.name }}
    </p>
    <p class="text-blue-500 group-hover:text-blue-700">
      <span v-if="isAllDay()">Jour entier</span>
      <time
        v-else
        :datetime="event.start.toString()"
      >{{ $toFormat(event.start, 'HH:00') }}</time>
    </p>
  </NuxtLink>
</li>
</template>

<script setup lang="ts">
import type { EventType } from '~~/types'
import { RouteNames } from '~~/helpers/routes'
import { type CalendarDay, useCalendarStore } from '~~/store/calendar/'

interface Props {
  event: EventType
  day: CalendarDay
  previousDay: CalendarDay
  nextDay: CalendarDay
  index: number
}

const props = defineProps<Props>()
const calendarStore = useCalendarStore()
const { isPeriodInDay, getHour } = dateHook()

function isAllDay() {
  return isPeriodInDay({
    start: props.event.start,
    end: props.event.end,
  }, props.day.date)
}

const multiplicator = 288 / 24

function getHeight() {
  if (isAllDay()) {
    return 288
  }
  return Math.abs(getHour(props.event.start) - getHour(props.event.end)) * multiplicator
}

function getStart() {
  if (isAllDay()) {
    return 1
  }
  return getHour(props.event.start) * multiplicator
}
</script>
