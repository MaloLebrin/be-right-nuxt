<template>
<div class="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
  <button
    v-for="day in calendarStore.getCalendarData"
    :key="day.label"
    class="flex flex-col items-center pt-2 pb-3 capitalize"
    :class="[getTextColor(day)]"
    @click="setSelectedDay(day)"
  >
    {{ $toFormat(day.date, 'dd') }}
    <span class="flex items-center justify-center w-8 h-8 mt-1 font-semibold">{{ $toFormat(day.date, 'DD') }}</span>
  </button>
</div>
<div class="hidden grid-cols-7 -mr-px text-sm leading-6 text-gray-500 border-r border-gray-100 divide-x divide-gray-100 sm:grid">
  <div class="col-end-1 w-14" />
  <div
    v-for="day in calendarStore.getCalendarData"
    :key="day.label"
    class="flex flex-col items-center pt-2 pb-3 capitalize"
  >
    <button
      class="flex items-center capitalize py-21font-semibold sm:justify-center"
      :class="[getTextColor(day)]"
      @click="setSelectedDay(day)"
    >
      <span class="not-sr-only md:sr-only">{{ $toFormat(day.date, 'dd DD') }}</span>
      <span class="sr-only md:not-sr-only lg:sr-only">{{ $toFormat(day.date, 'ddd DD') }}</span>
      <span class="sr-only lg:not-sr-only">{{ $toFormat(day.date, 'dddd DD') }}</span>
    </button>
    <span
      v-if="day.eventIds.length - 2"
      class="font-light text-gray-500"
    >
      + {{ day.eventIds.length - 2 }}
    </span>
  </div>
</div>
</template>

<script setup lang="ts">
import { type CalendarDay, useCalendarStore } from '~~/store'

const calendarStore = useCalendarStore()
const { setSelectedDay } = calendarStore

const { isToday } = dateHook()

function getTextColor(day: CalendarDay) {
  if (isToday(day.date)) {
    return 'text-indigo-500'
  }
  if (calendarStore.isSelectedDay(day)) {
    return 'text-orange-500'
  }
  return 'text-gray-700'
}
</script>
