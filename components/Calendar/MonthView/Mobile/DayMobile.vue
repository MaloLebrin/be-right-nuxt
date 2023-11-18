<template>
<button
  type="button"
  class="flex flex-col px-3 py-2 h-14 hover:bg-gray-100 focus:z-10"
  :class="[isInCurrentMonth(day.date) ? 'bg-white' : 'bg-gray-50', (isSelected || isToday(day.date)) && 'font-semibold', isSelected && 'text-white', !isSelected && isToday(day.date) && 'text-white', !isSelected && isInCurrentMonth(day.date) && !isToday(day.date) && 'text-gray-900', !isSelected && !isInCurrentMonth(day.date) && !isToday(day.date) && 'text-gray-500']"
  @click="setSelectedDay(day)"
>
  <time
    :datetime="day.date as unknown as string"
    class="ml-auto"
    :class="[(isSelected || isToday(day.date)) && 'flex h-6 w-6 items-center justify-center rounded-full', !isSelected && isToday(day.date) && 'bg-indigo-600', isSelected && !isToday(day.date) && 'bg-orange-600']"
  >{{ $toFormat(day.date, 'DD') }}</time>
  <span class="sr-only">{{ day.eventIds.length }} events</span>
  <span
    v-if="day.eventIds.length > 0"
    class="-mx-0.5 mt-auto flex flex-wrap-reverse"
  >
    <span
      v-for="id in day.eventIds"
      :key="id"
      class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
    />
  </span>
</button>
</template>

<script setup lang="ts">
import { type CalendarDay, useCalendarStore } from '~~/store'

interface Props {
  day: CalendarDay
  isSelected?: boolean
}

defineProps<Props>()

const { setSelectedDay } = useCalendarStore()

const { isToday, isInCurrentMonth } = dateHook()
</script>
