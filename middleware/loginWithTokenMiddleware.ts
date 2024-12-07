import { useAuthStore, useUiStore, useUserStore } from '~~/store'

export default defineNuxtRouteMiddleware(async to => {
  const uiStore = useUiStore()
  const { IncLoading, DecLoading } = uiStore
  const authStore = useAuthStore()
  const userStore = useUserStore()

  const token = authStore.getToken
  if (token) {
    const existingUser = userStore.getOneByToken(token)
    if (existingUser) {
      return
    }
    IncLoading()
    const { logWithToken } = authHook()
    await logWithToken(token)
    DecLoading()
  }
})
