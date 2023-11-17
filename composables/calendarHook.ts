import {
  type CalendarFetchDataResponse,
  useCalendarStore,
  useEventStore,
} from '~~/store'

export function calendarHook() {
  const { $api } = useNuxtApp()

  const eventStore = useEventStore()
  const {
    addMany,
  } = eventStore

  const calendarStore = useCalendarStore()
  const {
    setCalendarLoading,
    setCalendarData,
  } = calendarStore

  async function fetchCalendarData() {
    setCalendarLoading(true)

    const { data } = await $api().get<CalendarFetchDataResponse>(`event/calendar?start=${calendarStore.getMonthViewPeriod.start}&end=${calendarStore.getMonthViewPeriod.end}`)

    if (data) {
      const { events, calendarData } = data
      if (events?.length > 0) {
        addMany(events)
      }

      if (calendarData?.length > 0) {
        setCalendarData(calendarData)
      }
    }
    setCalendarLoading(false)
  }

  return {
    fetchCalendarData,
  }
}
