import { describe, expect, test } from 'vitest'
import { areNotifSubscriptions, isNotifSubscription } from '../../utils/notificationSubscription'

describe('areNotifSubscriptions', () => {
  test('should return true if all args are NotificationSubscriptionType', () => {
    const args = [
      {
        type: 'USER',
        createdByUserId: 1,
        notificationIds: [1, 2, 3],
      },
      {
        type: 'USER',
        createdByUserId: 1,
        notificationIds: [1, 2, 3],
      },
    ]
    expect(areNotifSubscriptions(args)).toBe(true)
  })

  test('should return false if one arg is not NotificationSubscriptionType', () => {
    const args = [
      {
        type: 'USER',
        createdByUserId: 1,
        notificationIds: [1, 2, 3],
      },
      {
        type: 'USER',
        createdByUserId: 1,
        notificationIds: [1, 2, 3],
      },
      {
        type: 'USER',
        createdByUserId: 1,
      },
    ]
    expect(areNotifSubscriptions(args)).toBe(false)
  })

  test('should return false if args is null', () => {
    expect(areNotifSubscriptions([null])).toBe(false)
  })
})

describe('isNotifSubscription', () => {
  test('should return true if arg is NotificationSubscriptionType', () => {
    const arg = {
      type: 'USER',
      createdByUserId: 1,
      notificationIds: [1, 2, 3],
    }
    expect(isNotifSubscription(arg)).toBe(true)
  })

  test('should return false if arg is not NotificationSubscriptionType', () => {
    const arg = {
      type: 'USER',
      createdByUserId: 1,
    }
    expect(isNotifSubscription(arg)).toBe(false)
  })

  test('should return false if arg is null', () => {
    expect(isNotifSubscription(null)).toBe(false)
  })

  test('should return false if arg is undefined', () => {
    expect(isNotifSubscription(undefined)).toBe(false)
  })

  test('should return false if arg is a string', () => {
    expect(isNotifSubscription('')).toBe(false)
  })
})
