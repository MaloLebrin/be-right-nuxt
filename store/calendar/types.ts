import type { EventType } from '../event/types'
import type { AnswerType } from '../answer/types'

export interface CalendarState {
  currentDate: Date
  isLoading: boolean
  data: CalendarDay[]
  selectedDay: null | CalendarDay
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
  answers: AnswerType[]
  events: EventType[]
  calendarData: CalendarDay[]
  total: number
}
