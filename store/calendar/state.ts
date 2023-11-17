import type { CalendarState } from './types'

export function defaultCalendarState(): CalendarState {
  return {
    currentDate: new Date(),
    isLoading: false,
    data: [],
  }
}

export const calendarState = defaultCalendarState()
