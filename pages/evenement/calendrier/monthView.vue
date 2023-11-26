<template>
<PageAuthWrapper>
  <div class="lg:flex lg:h-full lg:flex-col">
    <CalendarViewsHeader view="month" />
    <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
      <CalendarMonthViewDaysHeader />
      <div class="flex text-xs leading-6 text-gray-700 bg-gray-200 lg:flex-auto">
        <div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
          <CalendarSkeletonDay
            v-if="calendarStore.isCalendarLoading"
            :nb="30"
          />
          <template v-else>
            <CalendarMonthViewDesktopDayDesktop
              v-for="day in calendarStore.getCalendarData"
              :key="day.label"
              :day="day"
            />
          </template>
        </div>
        <div class="grid w-full grid-cols-7 grid-rows-6 gap-px isolate lg:hidden">
          <CalendarSkeletonDay
            v-if="calendarStore.isCalendarLoading"
            :nb="30"
          />
          <template v-else>
            <CalendarMonthViewMobileDayMobile
              v-for="day in calendarStore.getCalendarData"
              :key="day.label"
              :day="day"
              :is-selected="calendarStore.isSelectedDay(day)"
            />
          </template>
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
import CalendarMonthViewDaysHeader from '~/components/Calendar/MonthView/DaysHeader.vue'
import CalendarSkeletonDay from '~~/components/Calendar/Skeleton/day.vue'

const calendarStore = useCalendarStore()
const eventStore = useEventStore()

const selectedDayEvents = computed(() => eventStore.getMany(calendarStore.getSelectedDay?.eventIds || []))

calendarHook()

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
