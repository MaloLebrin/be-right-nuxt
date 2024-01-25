import { hasOwnProperty } from '@antfu/utils'
import { EventStatusEnum, type EventType, getEventStatusTranslationEnum } from '~~/types'

export function getEventStatusTranslation(status: EventStatusEnum) {
  return getEventStatusTranslationEnum[status]
}

export function getStatusColor(status: EventStatusEnum) {
  switch (status) {
    case EventStatusEnum.COMPLETED:
      return 'sky'
    case EventStatusEnum.PENDING:
      return 'orange'
    case EventStatusEnum.CLOSED:
      return 'gray'
    case EventStatusEnum.CREATE:
      return 'green'
    default:
      return 'gray'
  }
}

export function getEventStatusColor(status: EventStatusEnum) {
  return `text-${getStatusColor(status)}-500`
}
export function getEventStatusBGColor(status: EventStatusEnum) {
  return `bg-${getStatusColor(status)}-300`
}

export function sortEventByDate(events: EventType[]) {
  if (!events) {
    return []
  }
  return events
    .filter(event => event)
    .sort((a, b) => {
      if (a.start < b.start)
        return 1
      if (a.start > b.start)
        return -1
      return 0
    })
}

export function isEventType(event: any): event is EventType {
  return hasOwnProperty(event, 'start') && hasOwnProperty(event, 'end')
}

export function areEventTypes(events: unknown[]): events is EventType[] {
  if (!events) {
    return false
  }
  return events?.every(event => isEventType(event))
}
