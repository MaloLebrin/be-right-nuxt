import { describe, expect, test } from 'vitest'
import { fiveDigit } from '~/utils/regex'

describe('fiveDigit should match', () => {
  test('3STT- should match', () => {
    expect(fiveDigit.test('-')).toBeTruthy()
    expect(fiveDigit.test('3')).toBeTruthy()
    expect(fiveDigit.test('S')).toBeTruthy()
    expect(fiveDigit.test('T')).toBeTruthy()
    expect(fiveDigit.test('3STT-')).toBeTruthy()
  })
  test('1-7L4 should match', () => {
    const result = fiveDigit.test('1-7L4')
    expect(result).toBeTruthy()
  })
  test('7QD7Q should match', () => {
    const result = fiveDigit.test('7QD7Q')
    expect(result).toBeTruthy()
  })
  test('QJI9G should match', () => {
    const result = fiveDigit.test('QJI9G')
    expect(result).toBeTruthy()
  })
  test('UYD7S should match', () => {
    const result = fiveDigit.test('UYD7S')
    expect(result).toBeTruthy()
  })
  test('RCQOO should match', () => {
    const result = fiveDigit.test('RCQOO')
    expect(result).toBeTruthy()
  })
  test('R4IJB should match', () => {
    const result = fiveDigit.test('R4IJB')
    expect(result).toBeTruthy()
  })
})
