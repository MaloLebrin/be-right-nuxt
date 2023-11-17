import type { EventType } from '../event/types'

export interface CalendarState {
  currentDate: Date
  isLoading: boolean
  data: CalendarDay[]
}

export interface Period {
  start: Date
  end: Date
}

export interface CalendarDay {
  label: string
  eventIds: number[]
  date: Date
}

export interface CalendarFetchDataResponse {
  events: EventType[]
  calendarData: CalendarDay[]
  total: number
}
