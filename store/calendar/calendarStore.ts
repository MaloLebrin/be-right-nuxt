import { defineStore } from 'pinia'
import { calendarState } from './state'
import type { CalendarDay, TypeOfView } from './types'

const {
  toNextPeriod,
  toPreviousPeriod,
  toToday,
  getDatePeriod,
  isToday,
  toFormat,
} = dateHook()

export const useCalendarStore = defineStore('calendar', {
  state: () => ({ ...calendarState }),
  getters: {
    getCurrentDate: state => toFormat(state.currentDate, 'YYYY-MM-DD'),
    getMonthViewPeriod: state => getDatePeriod(state.currentDate, 'month'),
    getWeekViewPeriod: state => getDatePeriod(state.currentDate, 'week'),
    isCalendarLoading: state => state.isLoading,
    getCalendarData: state => state.data,
    getSelectedDay: state => state.selectedDay,
    isSelectedDay: state => (day: CalendarDay) => state.selectedDay?.date === day.date,
    getFirstSevenDays: state => state.data.slice(0, 7),
  },
  actions: {
    setNextPeriod(view: TypeOfView) {
      this.currentDate = toNextPeriod(this.currentDate, view)
    },
    setPreviousPeriod(view: TypeOfView) {
      this.currentDate = toPreviousPeriod(this.currentDate, view)
    },
    setToday() {
      this.currentDate = toToday()
    },
    setCalendarData(data: CalendarDay[]) {
      this.data = data
    },
    setCalendarLoading(bool: boolean) {
      this.isLoading = bool
    },
    setSelectedDay(day: CalendarDay) {
      this.selectedDay = day
    },
    setSelectedDayToday() {
      this.selectedDay = this.data.find(day => isToday(day.date)) || null
    },
  },
})
