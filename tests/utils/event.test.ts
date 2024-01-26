import { describe, expect, test } from 'vitest'
import {
  getEventStatusBGColor,
  getEventStatusColor,
  getEventStatusTranslation,
  getStatusColor,
  sortEventByDate,
} from '../../utils/event'
import { EventStatusEnum, type EventType } from '~~/types'

describe('getEventStatusTranslation', () => {
  test('return status translation', () => {
    expect(getEventStatusTranslation(EventStatusEnum.COMPLETED)).toBe('complété')
    expect(getEventStatusTranslation(EventStatusEnum.PENDING)).toBe('en cours')
    expect(getEventStatusTranslation(EventStatusEnum.CLOSED)).toBe('terminé')
    expect(getEventStatusTranslation(EventStatusEnum.CREATE)).toBe('à venir')
  })
})

describe('getStatusColor', () => {
  test('return status color', () => {
    expect(getStatusColor(EventStatusEnum.COMPLETED)).toBe('sky')
    expect(getStatusColor(EventStatusEnum.PENDING)).toBe('orange')
    expect(getStatusColor(EventStatusEnum.CLOSED)).toBe('gray')
    expect(getStatusColor(EventStatusEnum.CREATE)).toBe('green')
    expect(getStatusColor('' as EventStatusEnum)).toBe('gray')
    expect(getStatusColor(undefined as unknown as EventStatusEnum)).toBe('gray')
    expect(getStatusColor(null as unknown as EventStatusEnum)).toBe('gray')
  })
})

describe('getEventStatusColor', () => {
  test('return event status color', () => {
    expect(getEventStatusColor(EventStatusEnum.COMPLETED)).toBe('text-sky-500')
    expect(getEventStatusColor(EventStatusEnum.PENDING)).toBe('text-orange-500')
    expect(getEventStatusColor(EventStatusEnum.CLOSED)).toBe('text-gray-500')
    expect(getEventStatusColor(EventStatusEnum.CREATE)).toBe('text-green-500')
    expect(getEventStatusColor('' as EventStatusEnum)).toBe('text-gray-500')
    expect(getEventStatusColor(undefined as unknown as EventStatusEnum)).toBe('text-gray-500')
    expect(getEventStatusColor(null as unknown as EventStatusEnum)).toBe('text-gray-500')
  })
})

describe('getEventStatusBGColor', () => {
  test('return event status background color', () => {
    expect(getEventStatusBGColor(EventStatusEnum.COMPLETED)).toBe('bg-sky-300')
    expect(getEventStatusBGColor(EventStatusEnum.PENDING)).toBe('bg-orange-300')
    expect(getEventStatusBGColor(EventStatusEnum.CLOSED)).toBe('bg-gray-300')
    expect(getEventStatusBGColor(EventStatusEnum.CREATE)).toBe('bg-green-300')
    expect(getEventStatusBGColor('' as EventStatusEnum)).toBe('bg-gray-300')
    expect(getEventStatusBGColor(undefined as unknown as EventStatusEnum)).toBe('bg-gray-300')
    expect(getEventStatusBGColor(null as unknown as EventStatusEnum)).toBe('bg-gray-300')
  })
})

describe('sortEventByDate', () => {
  test('return sorted events', () => {
    const events = [
      { start: new Date('2021-01-01') },
      { start: new Date('2021-01-02') },
      { start: new Date('2021-01-03') },
      { start: new Date('2021-01-04') },
    ] as EventType[]
    expect(sortEventByDate(events)).toStrictEqual([
      { start: new Date('2021-01-04') },
      { start: new Date('2021-01-03') },
      { start: new Date('2021-01-02') },
      { start: new Date('2021-01-01') },
    ])
  })

  test('return sorted events with same date', () => {
    const now = new Date('2021-01-01')
    const events = [
      { start: now },
      { start: now },
      { start: now },
      { start: now },
    ] as EventType[]
    expect(sortEventByDate(events)).toStrictEqual([
      { start: now },
      { start: now },
      { start: now },
      { start: now },
    ])
  })

  test('return sorted events when array is empty', () => {
    expect(sortEventByDate([] as EventType[])).toStrictEqual([])
  })

  test('return sorted events when array is falsy', () => {
    expect(sortEventByDate(undefined as unknown as EventType[])).toStrictEqual([])
    expect(sortEventByDate(null as unknown as EventType[])).toStrictEqual([])
  })

  test('return sorted events when some has no start date', () => {
    const events = [
      { start: new Date('2021-01-01') },
      { start: new Date('2021-01-02') },
      { start: new Date('2021-01-03') },
      { start: new Date('2021-01-04') },
      { start: undefined },
    ] as EventType[]
    expect(sortEventByDate(events)).toStrictEqual([
      { start: new Date('2021-01-04') },
      { start: new Date('2021-01-03') },
      { start: new Date('2021-01-02') },
      { start: new Date('2021-01-01') },
      { start: undefined },
    ])
  })
})

describe('isEventType', () => {
  test('return true when event is EventType', () => {
    const event = { start: new Date('2021-01-01'), end: new Date('2021-01-01') }
    expect(isEventType(event)).toBe(true)
  })

  test('return false when event is not EventType', () => {
    const event = { start: new Date('2021-01-01') }
    expect(isEventType(event)).toBe(false)
    expect(isEventType(undefined)).toBe(false)
    expect(isEventType(null)).toBe(false)
    expect(isEventType('')).toBe(false)
    expect(isEventType(0)).toBe(false)
    expect(isEventType([])).toBe(false)
    expect(isEventType({})).toBe(false)
  })
})

describe('areEventTypes', () => {
  test('return true when events are EventTypes', () => {
    const events = [
      { start: new Date('2021-01-01'), end: new Date('2021-01-01') },
      { start: new Date('2021-01-01'), end: new Date('2021-01-01') },
      { start: new Date('2021-01-01'), end: new Date('2021-01-01') },
    ]
    expect(areEventTypes(events)).toBe(true)
  })

  test('return false when events are not EventTypes', () => {
    const events = [
      { start: new Date('2021-01-01'), end: new Date('2021-01-01') },
      { start: new Date('2021-01-01') },
      { start: new Date('2021-01-01'), end: new Date('2021-01-01') },
    ]
    expect(areEventTypes(events)).toBe(false)
    expect(areEventTypes(undefined as unknown as EventType[])).toBe(false)
    expect(areEventTypes(null as unknown as EventType[])).toBe(false)
    expect(areEventTypes('' as unknown as EventType[])).toBe(false)
    expect(areEventTypes(0 as unknown as EventType[])).toBe(false)
    expect(areEventTypes([] as unknown as EventType[])).toBe(true)
  })
})
