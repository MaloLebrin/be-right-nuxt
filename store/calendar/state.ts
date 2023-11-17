import type { CalendarState } from './types'

export function defaultCalendarState(): CalendarState {
  return {
    currentDate: new Date(),
  }
}

export const calendarState = defaultCalendarState()
