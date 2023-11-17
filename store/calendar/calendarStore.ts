import { defineStore } from 'pinia'
import { calendarState } from './state'

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

  },
})
