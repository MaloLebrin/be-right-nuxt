import {
  type CalendarFetchDataResponse,
  useCalendarStore,
  useEventStore,
} from '~~/store'

export function calendarHook() {
  const { $api, $router } = useNuxtApp()

  const eventStore = useEventStore()
  const {
    addMany,
  } = eventStore

  const calendarStore = useCalendarStore()
  const {
    setCalendarLoading,
    setCalendarData,
    setSelectedDayToday,
  } = calendarStore

  onMounted(async () => {
    await fetchCalendarData()
    setSelectedDayToday()

    watch(() => [$router.currentRoute.value.query], async () => {
      await fetchCalendarData()
    }, { deep: true })

    watch(() => [calendarStore.getMonthViewPeriod], ([period]) => {
      $router.push({
        query: {
          start: period.start.toString(),
          end: period.end.toString(),
        },
      })
    }, { deep: true })
  })

  async function fetchCalendarData() {
    setCalendarLoading(true)
    const { start, end } = calendarStore.getMonthViewPeriod

    const { data } = await $api().get<CalendarFetchDataResponse>(`event/calendar?start=${start}&end=${end}`)

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
