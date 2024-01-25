import { describe, expect, test } from 'vitest'
import {
  areAnswersType,
  isAnswerSigned,
  isAnswerType,
} from '../../utils/answer'
import type { AnswerType } from '~/store'

describe('isAnswerType', () => {
  test('returns true if arg is AnswerType', () => {
    const arg = {
      hasSigned: true,
      eventId: 1,
      employeeId: 1,
    }
    expect(isAnswerType(arg)).toBe(true)
  })

  test('returns false if arg is not AnswerType', () => {
    const arg = {
      hasSigned: true,
      eventId: 1,
    }
    expect(isAnswerType(arg)).toBe(false)
  })

  test('returns false if arg is empty', () => {
    expect(isAnswerType({})).toBe(false)
  })

  test('returns false if arg is null', () => {
    expect(isAnswerType(null)).toBe(false)
  })

  test('returns false if arg is undefined', () => {
    expect(isAnswerType(undefined)).toBe(false)
  })

  test('returns false if arg is string', () => {
    expect(isAnswerType('')).toBe(false)
  })

  test('returns false if arg is number', () => {
    expect(isAnswerType(1)).toBe(false)
  })

  test('returns false if arg is boolean', () => {
    expect(isAnswerType(true)).toBe(false)
  })

  test('returns false if arg is array', () => {
    expect(isAnswerType([])).toBe(false)
  })

  test('returns false if arg is function', () => {
    expect(isAnswerType(() => {})).toBe(false)
  })
})

describe('areAnswersType', () => {
  test('returns true if all args are AnswerType', () => {
    const args = [
      {
        hasSigned: true,
        eventId: 1,
        employeeId: 1,
      },
      {
        hasSigned: true,
        eventId: 1,
        employeeId: 1,
      },
    ]
    expect(areAnswersType(args)).toBe(true)
  })

  test('returns false if any arg is not AnswerType', () => {
    const args = [
      {
        hasSigned: true,
        eventId: 1,
        employeeId: 1,
      },
      {
        hasSigned: true,
        eventId: 1,
      },
    ]
    expect(areAnswersType(args)).toBe(false)
  })

  test('returns true if arg is empty', () => {
    expect(areAnswersType([])).toBe(true)
  })

  test('returns false if arg is null', () => {
    expect(areAnswersType(null as any)).toBe(false)
  })

  test('returns false if arg is undefined', () => {
    expect(areAnswersType(undefined as any)).toBe(false)
  })
})

describe('isAnswerSigned', () => {
  test('returns true if answer is signed', () => {
    const answer = {
      hasSigned: true,
      eventId: 1,
      employeeId: 1,
      signedAt: new Date(),
    } as AnswerType
    expect(isAnswerSigned(answer)).toBe(true)
  })

  test('returns false if answer is not signed', () => {
    const answer = {
      hasSigned: true,
      eventId: 1,
      employeeId: 1,
      signedAt: null,
    } as AnswerType
    expect(isAnswerSigned(answer)).toBe(false)
  })

  test('returns false if answer is empty', () => {
    const answer = {} as AnswerType
    expect(isAnswerSigned(answer)).toBe(false)
  })

  test('returns false if answer is null', () => {
    const answer = null as any
    expect(isAnswerSigned(answer)).toBe(false)
  })
})
