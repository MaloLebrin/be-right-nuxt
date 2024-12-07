import { useAuthStore } from '~/store'

export default defineNuxtRouteMiddleware(async to => {
  const sessionId = to.params.sessionId.toString()
  const { getCookie } = authHook()
  const { setToken } = useAuthStore()

  const cookieToken = getCookie()

  const token = cookieToken.value
  if (token) {
    setToken(token)
  }
  const { getCheckoutSession } = stripeSessionHook()
  if (sessionId) {
    await getCheckoutSession(sessionId)
  }
})
