import { hasOwnProperty } from '@antfu/utils'
import type { AnswerType } from '~/store/answer/types'

export function isAnswerType(obj: any): obj is AnswerType {
  if (!obj) {
    return false
  }

  return hasOwnProperty(obj, 'hasSigned') && hasOwnProperty(obj, 'eventId') && hasOwnProperty(obj, 'employeeId')
}

export function areAnswersType(array: any[]): array is AnswerType[] {
  if (!array) {
    return false
  }
  return array?.every(item => isAnswerType(item))
}

export function isAnswerSigned(answer: AnswerType): boolean {
  if (!answer) {
    return false
  }
  return answer.signedAt !== null && answer.signedAt !== undefined
}
