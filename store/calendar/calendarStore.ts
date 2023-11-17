import { defineStore } from 'pinia'
import { calendarState } from './state'
import type { CalendarDay } from './types'

const {
  toNextMonth,
  toPreviousMonth,
  toToday,
  getDatePeriod,
} = dateHook()

export const useCalendarStore = defineStore('calendar', {
  state: () => ({ ...calendarState }),
  getters: {
    getCurrentDate: state => state.currentDate,
    getMonthViewPeriod: state => getDatePeriod(state.currentDate, 'month'),
    getWeekViewPeriod: state => getDatePeriod(state.currentDate, 'week'),
    isCalendarLoading: state => state.isLoading,
    getCalendarData: state => state.data,
  },
  actions: {
    setNextMonth() {
      this.currentDate = toNextMonth(this.currentDate)
    },
    setPreviousMonth() {
      this.currentDate = toPreviousMonth(this.currentDate)
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

  },
})
