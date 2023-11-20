import {
  type CalendarFetchDataResponse,
  type TypeOfView,
  useAnswerStore,
  useCalendarStore,
  useEventStore,
} from '~~/store'

export function calendarHook(view: TypeOfView = 'month') {
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

  const answerStore = useAnswerStore()

  onMounted(async () => {
    await fetchCalendarData()
    setSelectedDayToday()

    watch(() => [$router.currentRoute.value.query], async () => {
      await fetchCalendarData()
    }, { deep: true })

    if (view === 'week') {
      watch(() => [calendarStore.getWeekViewPeriod], ([period]) => {
        $router.push({
          query: {
            start: period.start.toString(),
            end: period.end.toString(),
          },
        })
      }, { deep: true })
    }
    if (view === 'month') {
      watch(() => [calendarStore.getMonthViewPeriod], ([period]) => {
        $router.push({
          query: {
            start: period.start.toString(),
            end: period.end.toString(),
          },
        })
      }, { deep: true })
    }
  })

  async function fetchCalendarData() {
    setCalendarLoading(true)
    let period = calendarStore.getMonthViewPeriod

    if (view === 'week') {
      period = calendarStore.getWeekViewPeriod
    }
    const { start, end } = period

    const { data } = await $api().get<CalendarFetchDataResponse>(`event/calendar?start=${start}&end=${end}`)

    if (data) {
      const { answers, events, calendarData } = data
      if (events?.length > 0) {
        addMany(events)
      }

      if (answers?.length > 0) {
        answerStore.addMany(answers)
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
