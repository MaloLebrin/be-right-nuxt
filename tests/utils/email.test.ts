import { describe, expect, test } from 'vitest'
import {
  emailSuggestion,
  isCompleteEmail,
  isHalfEmail,
  multipleEmailSuggestions,
} from '~~/utils/email'

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

describe('multipleEmailSuggestions', () => {
  test('string is empty should return []', () => {
    const result = multipleEmailSuggestions({
      firstName: '',
      lastName: '',
      email: '',
    })

    expect(result).toHaveLength(0)
    expect(result).toStrictEqual([])
  })

  test('email is not empty should suggest domain and extension email', () => {
    const result = multipleEmailSuggestions({
      firstName: '',
      lastName: '',
      email: 'exemple@exemple.com',
    })

    expect(result).toHaveLength(1)
    expect(result).toStrictEqual(['@exemple.com'])
  })

  test('function should compose list of suggestion based of firstName and lastName', () => {
    const result = multipleEmailSuggestions({
      firstName: 'John',
      lastName: 'Doe',
      email: 'exemple@exemple.com',
    })

    expect(result).toStrictEqual([
      'john.doe@exemple.com',
      'johndoe@exemple.com',
      'john-doe@exemple.com',
      'jdoe@exemple.com',
      'john@exemple.com',
      'doe@exemple.com',
    ])
  })
})
