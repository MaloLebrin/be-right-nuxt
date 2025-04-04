import { useNotificationsStore, useUserStore } from '~~/store'

export default function notificationSSEHook() {
  const { $getApiUrl, $pinia } = useNuxtApp()
  const notificationStore = useNotificationsStore($pinia)
  const { addMany: addManyNotifications } = notificationStore
  const userStore = useUserStore($pinia)

  const sse = ref<null | EventSource>(null)

  function startSEE() {
    if (userStore.getAuthUser) {
      sse.value = new EventSource(`${$getApiUrl}sse/${userStore.getAuthUser?.notificationToken}`)

      sse.value.addEventListener('message', async ({ data }) => {
        const notifs = await JSON.parse(data)
        if (data && areNotificationTypes(notifs)) {
          addManyNotifications(notifs)
        }
      })
    }
  }

  function closeSSE() {
    sse.value?.close()
  }

  return {
    closeSSE,
    startSEE,
    sse,
  }
}
