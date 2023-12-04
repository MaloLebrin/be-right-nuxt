import { useNotificationsStore, useUserStore } from '~~/store'

export default function notificationSSEHook() {
  const { $getApiUrl } = useNuxtApp()
  const notificationStore = useNotificationsStore()
  const { addMany: addManyNotifications } = notificationStore
  const userStore = useUserStore()

  const { areNotificationTypes } = notificationHook()

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

  onBeforeUnmount(() => {
    closeSSE()
  })

  function closeSSE() {
    sse.value?.close()
  }

  return {
    closeSSE,
    startSEE,
    sse,
  }
}
