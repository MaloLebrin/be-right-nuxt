<template>
<PageAuthWrapper>
  <div class="flex flex-col h-full">
    <CalendarViewsHeader view="week" />

    <div
      ref="container"
      class="flex flex-col flex-auto overflow-auto bg-white isolate"
    >
      <div
        style="width: 165%"
        class="flex flex-col flex-none max-w-full sm:max-w-none md:max-w-full"
      >
        <div
          ref="containerNav"
          class="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
        >
          <CalendarWeekViewDay />
        </div>
        <div class="flex flex-auto">
          <div class="sticky left-0 z-10 flex-none bg-white w-14 ring-1 ring-gray-100" />
          <div class="grid flex-auto grid-cols-1 grid-rows-1">
            <!-- Horizontal lines -->
            <div
              class="grid col-start-1 col-end-2 row-start-1 divide-y divide-gray-100"
              style="grid-template-rows: repeat(48, minmax(3.5rem, 1fr))"
            >
              <div
                ref="containerOffset"
                class="row-end-1 h-7"
              />
              <HoursDay />
            </div>

            <!-- Vertical lines -->
            <div class="hidden grid-cols-7 col-start-1 col-end-2 grid-rows-1 row-start-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
              <div class="col-start-1 row-span-full" />
              <div class="col-start-2 row-span-full" />
              <div class="col-start-3 row-span-full" />
              <div class="col-start-4 row-span-full" />
              <div class="col-start-5 row-span-full" />
              <div class="col-start-6 row-span-full" />
              <div class="col-start-7 row-span-full" />
              <div class="w-8 col-start-8 row-span-full" />
            </div>

            <!-- Events -->
            <ol
              class="grid grid-cols-1 col-start-1 col-end-2 row-start-1 sm:grid-cols-7 sm:pr-8"
              style="grid-template-rows: 1.75rem repeat(288, minmax(0, 1fr)) auto"
            >
              <CalendarEventInADay
                v-for="(day, index) in calendarStore.getFirstSevenDays"
                :key="day.label"
                :event="eventStore.getOne(day.eventIds[0])"
                :day="day"
                :previous-day="calendarStore.getFirstSevenDays[index - 1]"
                :next-day="calendarStore.getFirstSevenDays[index + 1]"
                :index="index"
              />
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</PageAuthWrapper>
</template>

<script setup lang="ts">
import HoursDay from '~~/components/Calendar/HoursDay.vue'
import CalendarWeekViewDay from '~/components/Calendar/WeekView/Day.vue'
import PageAuthWrapper from '~/components/Page/PageAuthWrapper.vue'
import CalendarViewsHeader from '~~/components/Calendar/ViewsHeader.vue'
import CalendarEventInADay from '~~/components/Calendar/EventInADay.vue'
import { useCalendarStore, useEventStore } from '~~/store'

const container = ref<null | HTMLDivElement>(null)
const containerNav = ref<null | HTMLDivElement>(null)
const containerOffset = ref<null | HTMLDivElement>(null)

calendarHook('week')

const calendarStore = useCalendarStore()
const eventStore = useEventStore()

onMounted(() => {
  // Set the container scroll position based on the current time.
  const currentMinute = new Date().getHours() * 60
  if (container.value && containerNav.value && containerOffset.value) {
    container.value.scrollTop
      = ((container.value.scrollHeight - containerNav.value.offsetHeight - containerOffset.value.offsetHeight)
        * currentMinute)
      / 1440
  }
})

useHead({
  title: 'Calendrier - Vue Semaine',
})

definePageMeta({
  layout: 'auth',
  isAuth: true,
  isAdmin: false,
  middleware: ['guards-middleware'],
})
</script>
