<template>
<div class="grid grid-cols-7 gap-px text-xs font-semibold leading-6 text-center text-gray-700 bg-gray-200 border-b border-gray-300 lg:flex-none">
  <div
    v-for="day in calendarStore.getFirstSevenDays"
    :key="day.date.toString()"
    class="py-2 capitalize bg-white"
  >
    <span class="not-sr-only sm:sr-only">{{ $toFormat(day.date, 'dd') }}</span>
    <span class="sr-only sm:not-sr-only lg:sr-only">{{ $toFormat(day.date, 'ddd') }}</span>
    <span class="sr-only lg:not-sr-only">{{ $toFormat(day.date, 'dddd') }}</span>
  </div>
</div>
</template>

<script setup lang="ts">
import { useCalendarStore } from '~~/store'

const calendarStore = useCalendarStore()
</script>
