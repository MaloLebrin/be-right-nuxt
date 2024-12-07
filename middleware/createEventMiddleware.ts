import { useAuthStore, useUiStore } from '~~/store'

export default defineNuxtRouteMiddleware(async () => {
  const uiStore = useUiStore()
  const authStore = useAuthStore()
  const { IncLoading, DecLoading } = uiStore

  const token = authStore.getToken
  if (token) {
    IncLoading()
    const { logWithToken } = authHook()
    await logWithToken(token)
    DecLoading()
  }
})
