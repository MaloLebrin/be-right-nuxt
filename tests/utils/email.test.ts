import { describe, expect, test } from 'vitest'
import { emailSuggestion, isCompleteEmail, isHalfEmail } from '~~/utils/email'

describe('emailSuggestion generate email based on email passed in params', () => {
  test('string is empty should return null', () => {
    expect(emailSuggestion('')).toBeNull()
    expect(emailSuggestion('ezlrkgenkljt')).toBeNull()
  })

  test('string should return "@domain.country"', () => {
    expect(emailSuggestion('exemple@exemple.com')).toStrictEqual('@exemple.com')
  })
})

describe('isHalfEmail', () => {
  test('string is empty should return false', () => {
    expect(isHalfEmail('')).toBeFalsy()
    expect(isHalfEmail('ezlrkgenkljt')).toBeFalsy()
    expect(isHalfEmail('exemple@exemple.com')).toBeFalsy()
  })
  test('string should return true', () => {
    expect(isHalfEmail('@exemple.com')).toBeTruthy()
  })
})
describe('isCompleteEmail', () => {
  test('string is empty should return false', () => {
    expect(isCompleteEmail('')).toBeFalsy()
    expect(isCompleteEmail('ezlrkgenkljt')).toBeFalsy()
    expect(isCompleteEmail('@exemple.com')).toBeFalsy()
  })
  test('string should return true', () => {
    expect(isCompleteEmail('exemple@exemple.com')).toBeTruthy()
  })
})
