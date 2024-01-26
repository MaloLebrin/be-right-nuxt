import { hasOwnProperty } from '@antfu/utils'
import { type NotificationType, NotificationTypeEnum } from '~/store/notification/types'

export function areNotificationTypes(args: unknown[]): args is NotificationType[] {
  if (!args || !isArray(args)) {
    return false
  }
  return args?.every(arg =>
    hasOwnProperty(arg, 'type')
    && hasOwnProperty(arg, 'title')
    && hasOwnProperty(arg, 'subscriberId')
    && hasOwnProperty(arg, 'eventNotificationId'),
  )
}

export function getTranslationNotificationType(type: NotificationTypeEnum) {
  switch (type) {
    case NotificationTypeEnum.EVENT_CREATED:
      return {
        label: 'Création d\'événements',
        description: 'Vous recevrez des notifications de création d\'événements',
      }
    case NotificationTypeEnum.EVENT_COMPLETED:
      return {
        label: 'Événements complété',
        description: 'Vous recevrez des notifications lorsque tous les destinataires auront répondu à un événement',
      }
    case NotificationTypeEnum.EVENT_CLOSED:
      return {
        label: 'Événements terminé',
        description: 'Vous recevrez des notifications lorsque la date de fin de l\'événement sera passée',
      }
    case NotificationTypeEnum.ANSWER_RESPONSE_ACCEPTED:
      return {
        label: 'Droits à l\'image accepté',
        description: 'Vous recevrez des notifications lorsqu\'un destinataire aura accepté les droits à l\'image d\'un événement',
      }
    case NotificationTypeEnum.ANSWER_RESPONSE_REFUSED:
      return {
        label: 'Droits à l\'image refusé',
        description: 'Vous recevrez des notifications lorsqu\'un destinataire aura refusé les droits à l\'image d\'un événement',
      }
  }
}
