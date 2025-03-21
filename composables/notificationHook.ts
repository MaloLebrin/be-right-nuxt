import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import isBetween from 'dayjs/plugin/isBetween'
import { uniq } from '@antfu/utils'
import type { NotificationType } from '~~/store'
import {
  useAnswerStore,
  useAuthStore,
  useEventStore,
  useNotificationsStore,
  useUiStore,
  useUserStore,
} from '~~/store'

dayjs.extend(relativeTime)
dayjs.extend(isBetween)

export default function notificationHook() {
  const { $api, $toFormat, $toast, $pinia } = useNuxtApp()

  const { IncLoading, DecLoading } = useUiStore($pinia)
  const authStore = useAuthStore($pinia)
  const userStore = useUserStore($pinia)
  const eventStore = useEventStore($pinia)
  const answerStore = useAnswerStore($pinia)
  const notificationStore = useNotificationsStore($pinia)
  const { addMany: addManyNotifications, updateManyNotifications } = notificationStore

  const { fetchMany: fetchManyAnswers } = answerHook()
  const { fetchMany: fetchManyEvents } = eventHook()

  function getDateDisplayedNotification(notification: NotificationType) {
    const { readAt, createdAt } = notification
    const now = dayjs()
    const yesterday = now.subtract(1, 'day')

    if (!readAt) {
      if (dayjs(createdAt).isBetween(now, yesterday)) {
        return dayjs().to(dayjs(createdAt), true)
      }
      return `Créé le ${$toFormat(createdAt, 'DD MMMM YYYY')}`
    } else {
      if (dayjs(readAt).isBetween(now, yesterday)) {
        return dayjs().to(dayjs(readAt), true)
      }
      return `Lu le ${$toFormat(readAt, 'DD MMMM YYYY')}`
    }
  }

  async function fetchUserNotifications() {
    IncLoading()
    const { data } = await $api().get<NotificationType[]>('notifications')

    if (data && data.length > 0) {
      addManyNotifications(data)
    }
    DecLoading()
  }

  async function patchAsRead(notificationIds: number[]) {
    IncLoading()
    if (notificationIds?.length) {
      const { success, data } = await $api().patch<NotificationType[]>(`notifications/readMany?ids=${notificationIds.join(',')}`, [])

      if (data?.length && areNotificationTypes(data)) {
        updateManyNotifications(data)
      }
      if (success) {
        $toast.success('Notifications marquées comme lues')
      }
    }
    DecLoading()
  }

  async function fetchUserNotificationsAndRelations() {
    if (!authStore.isAuthUserAdmin && userStore.getAuthUser) {
      await fetchUserNotifications()
    }

    const notifications = notificationStore.getAllArray

    if (notifications?.length > 0) {
      const missingEventIds: number[] = []
      const missingAnswerIds: number[] = []

      notifications.forEach(notif => {
        if (notif.eventNotification) {
          const { eventId, answerId } = notif.eventNotification
          if (eventId && !eventStore.isAlreadyInStore(eventId)) {
            missingEventIds.push(eventId)
          }
          if (answerId && !answerStore.isAlreadyInStore(answerId)) {
            missingAnswerIds.push(answerId)
          }
        }
      })

      if (missingAnswerIds.length > 0) {
        await fetchManyAnswers(uniq(missingAnswerIds))
      }

      answerStore.getAllArray.forEach(answer => {
        if (!eventStore.isAlreadyInStore(answer.eventId) && answer.eventId) {
          missingEventIds.push(answer.eventId)
        }
      })

      if (missingEventIds.length > 0) {
        await fetchManyEvents(uniq(missingEventIds))
      }
    }
  }

  async function scheduleNotifications() {
    setInterval(async () => {
      await fetchUserNotifications()
      // 15 minutes
    }, 900000)
  }

  return {
    getDateDisplayedNotification,
    fetchUserNotifications,
    fetchUserNotificationsAndRelations,
    patchAsRead,
    scheduleNotifications,
  }
}
