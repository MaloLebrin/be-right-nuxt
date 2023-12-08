import { useEventSource } from '@vueuse/core'
import { useAuthStore, useNotificationsStore, useUserStore } from '~~/store'

export default async function notificationSSEHook() {
  const { $getApiUrl, $toast } = useNuxtApp()
  const notificationStore = useNotificationsStore()
  const { addMany: addManyNotifications } = notificationStore
  const userStore = useUserStore()
  const authStore = useAuthStore()

  const { areNotificationTypes } = notificationHook()

  const { status, data, error, close } = useEventSource(`${$getApiUrl}sse/${userStore.getAuthUser?.notificationToken}`)

  console.log(data.value, '<==== data.value')
  if (data.value) {
    const notifs = await JSON.parse(data.value)
    if (areNotificationTypes(notifs)) {
      addManyNotifications(notifs)
    }
  }

  if (error.value) {
    console.log(error.value, '<==== error.value')
    $toast.danger(error.value)
  }

  watch(() => authStore.getIsLoggedIn, newValue => {
    if (!newValue) {
      close()
    }
  })

  // watch(() => status.value, newValue => {
  //   if (newValue === 'CONNECTING') {
  //     $toast.info('SSE connection error')
  //   }
  //   if (newValue === 'OPEN') {
  //     $toast.info('SSE connection opened')
  //   }
  //   if (newValue === 'CLOSED') {
  //     $toast.info('SSE connection closed')
  //   }
  // })

  return {
    close,
  }
}
