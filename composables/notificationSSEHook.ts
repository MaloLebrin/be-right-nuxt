import { useNotificationsStore, useUserStore } from '~~/store'

export default function notificationSSEHook() {
  const notificationStore = useNotificationsStore()
  const { addMany: addManyNotifications } = notificationStore
  const userStore = useUserStore()

  const { areNotificationTypes } = notificationHook()

  const sse = ref<null | EventSource>(null)

  if (userStore.getAuthUser) {
    sse.value = new EventSource(`http://localhost:8080/sse/${userStore.getAuthUser?.notificationToken}`)

    sse.value.addEventListener('message', async ({ data }) => {
      const notifs = await JSON.parse(data)
      if (data && areNotificationTypes(notifs)) {
        addManyNotifications(notifs)
      }
    })
  }

  onBeforeUnmount(() => {
    sse.value?.close()
  })
}
