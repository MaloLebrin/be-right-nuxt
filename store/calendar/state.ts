import type { CalendarState } from './types'

export function defaultCalendarState(): CalendarState {
  return {
    currentDate: new Date(),
    isLoading: false,
    data: [],
    selectedDay: null,
  }
}

export const calendarState = defaultCalendarState()
