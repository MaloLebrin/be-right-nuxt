import { hasOwnProperty } from '@antfu/utils'
import type { NotificationSubscriptionType } from '~/store/notification/types'

export function isNotifSubscription(arg: unknown): arg is NotificationSubscriptionType {
  return hasOwnProperty(arg, 'type')
    && hasOwnProperty(arg, 'createdByUserId')
    && hasOwnProperty(arg, 'notificationIds')
}

export function areNotifSubscriptions(args: unknown[]): args is NotificationSubscriptionType[] {
  return args.every(arg => isNotifSubscription(arg))
}
