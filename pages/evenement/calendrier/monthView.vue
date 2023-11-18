<template>
<PageAuthWrapper>
  <div class="lg:flex lg:h-full lg:flex-col">
    <CalendarViewsHeader />
    <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
      <div class="grid grid-cols-7 gap-px text-xs font-semibold leading-6 text-center text-gray-700 bg-gray-200 border-b border-gray-300 lg:flex-none">
        <div class="py-2 bg-white">
          M<span class="sr-only sm:not-sr-only">on</span>
        </div>
        <div class="py-2 bg-white">
          T<span class="sr-only sm:not-sr-only">ue</span>
        </div>
        <div class="py-2 bg-white">
          W<span class="sr-only sm:not-sr-only">ed</span>
        </div>
        <div class="py-2 bg-white">
          T<span class="sr-only sm:not-sr-only">hu</span>
        </div>
        <div class="py-2 bg-white">
          F<span class="sr-only sm:not-sr-only">ri</span>
        </div>
        <div class="py-2 bg-white">
          S<span class="sr-only sm:not-sr-only">at</span>
        </div>
        <div class="py-2 bg-white">
          S<span class="sr-only sm:not-sr-only">un</span>
        </div>
      </div>
      <div class="flex text-xs leading-6 text-gray-700 bg-gray-200 lg:flex-auto">
        <div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
          <CalendarMonthViewDesktopDayDesktop
            v-for="day in calendarStore.getCalendarData"
            :key="day.label"
            :day="day"
          />
        </div>
        <div class="grid w-full grid-cols-7 grid-rows-6 gap-px isolate lg:hidden">
          <CalendarMonthViewMobileDayMobile
            v-for="day in calendarStore.getCalendarData"
            :key="day.label"
            :day="day"
            :is-selected="calendarStore.isSelectedDay(day)"
          />
        </div>
      </div>
      <div
        v-if="selectedDayEvents.length > 0"
        class="px-4 py-10 sm:px-6 lg:hidden"
      >
        <CalendarMonthViewMobileEventList :events="selectedDayEvents" />
      </div>
    </div>
  </div>
</PageAuthWrapper>
</template>

<script setup lang="ts">
import { useCalendarStore, useEventStore } from '~~/store'
import CalendarViewsHeader from '~~/components/Calendar/ViewsHeader.vue'
import PageAuthWrapper from '~/components/Page/PageAuthWrapper.vue'
import CalendarMonthViewMobileDayMobile from '~/components/Calendar/MonthView/Mobile/DayMobile.vue'
import CalendarMonthViewDesktopDayDesktop from '~/components/Calendar/MonthView/Desktop/DayDesktop.vue'
import CalendarMonthViewMobileEventList from '~/components/Calendar/MonthView/Mobile/EventList.vue'

const calendarStore = useCalendarStore()
const { setSelectedDayToday } = calendarStore
const eventStore = useEventStore()

const selectedDayEvents = computed(() => eventStore.getMany(calendarStore.getSelectedDay?.eventIds || []))

const {
  fetchCalendarData,
} = calendarHook()

onMounted(async () => {
  await fetchCalendarData()
  setSelectedDayToday()
})

useHead({
  title: 'Calendrier - Vue mois',
})

definePageMeta({
  layout: 'auth',
  isAuth: true,
  isAdmin: false,
  middleware: ['guards-middleware'],
})
</script>
