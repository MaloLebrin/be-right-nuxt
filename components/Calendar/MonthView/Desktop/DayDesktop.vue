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
      <EventCard
        :event="event"
        :answers="getAnswers(event.id).value"
      />
    </li>
    <li v-if="day.eventIds.length > 2">
      <EventListCard :events="events.slice(2)" />
    </li>
  </ol>
</div>
</template>

<script setup lang="ts">
import EventListCard from '~~/components/Calendar/EventCard/EventListCard.vue'
import EventCard from '~~/components/Calendar/EventCard/EventCard.vue'
import {
  type CalendarDay,
  useAnswerStore,
  useCalendarStore,
  useEventStore,
} from '~~/store'

interface Props {
  day: CalendarDay
}

const props = defineProps<Props>()

const answerStore = useAnswerStore()
const eventStore = useEventStore()
const calendarStore = useCalendarStore()
const { setSelectedDay } = calendarStore
const { isToday, isInCurrentMonth } = dateHook()
const events = eventStore.getMany(props.day.eventIds)
const getAnswers = (eventId: number) => computed(() => answerStore.getManyByEventId(eventId))
</script>
