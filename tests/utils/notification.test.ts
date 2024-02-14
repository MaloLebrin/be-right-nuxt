import { describe, expect, test } from 'vitest'
import { getTranslationNotificationType } from '../../utils/notification'
import type { NotificationType, NotificationTypeEnum } from '~/store'

describe('getTranslationNotificationType', () => {
  test('should return the correct translation', () => {
    expect(getTranslationNotificationType('EVENT_CREATED' as NotificationTypeEnum)).toStrictEqual({
      label: 'Création d\'événements',
      description: 'Vous recevrez des notifications de création d\'événements',
    })

    expect(getTranslationNotificationType('EVENT_COMPLETED' as NotificationTypeEnum)).toStrictEqual({
      label: 'Événements complété',
      description: 'Vous recevrez des notifications lorsque tous les destinataires auront répondu à un événement',
    })

    expect(getTranslationNotificationType('EVENT_CLOSED' as NotificationTypeEnum)).toStrictEqual({
      label: 'Événements terminé',
      description: 'Vous recevrez des notifications lorsque la date de fin de l\'événement sera passée',
    })

    expect(getTranslationNotificationType('ANSWER_RESPONSE_ACCEPTED' as NotificationTypeEnum)).toStrictEqual({
      label: 'Droits à l\'image accepté',
      description: 'Vous recevrez des notifications lorsqu\'un destinataire aura accepté les droits à l\'image d\'un événement',
    })

    expect(getTranslationNotificationType('ANSWER_RESPONSE_REFUSED' as NotificationTypeEnum)).toStrictEqual({
      label: 'Droits à l\'image refusé',
      description: 'Vous recevrez des notifications lorsqu\'un destinataire aura refusé les droits à l\'image d\'un événement',
    })

    expect(getTranslationNotificationType('' as NotificationTypeEnum)).toBeUndefined()
  })
})

describe('areNotificationTypes', () => {
  test('should return false if args is not an array', () => {
    expect(areNotificationTypes('' as unknown as NotificationType[])).toBe(false)
    expect(areNotificationTypes({} as unknown as NotificationType[])).toBe(false)
    expect(areNotificationTypes(1 as unknown as NotificationType[])).toBe(false)
    expect(areNotificationTypes(true as unknown as NotificationType[])).toBe(false)
    expect(areNotificationTypes(undefined as unknown as NotificationType[])).toBe(false)
    expect(areNotificationTypes(null as unknown as NotificationType[])).toBe(false)
  })

  test('should return false if args is an empty array', () => {
    expect(areNotificationTypes([])).toBe(true)
  })

  test('should return false if args is an array of NotificationType', () => {
    expect(areNotificationTypes([
      {
        id: 1,
        type: 'EVENT_CREATED',
        title: 'Création d\'événements',
        subscriberId: 1,
        eventNotificationId: 1,
        createdAt: '2021-07-07T14:00:00.000Z',
        readAt: null,
      },
    ])).toBe(true)
  })
})
