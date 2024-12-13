import { useJwt } from '@vueuse/integrations/useJwt'
import { RouteNames } from '~/helpers/routes'
import { useAuthStore } from '~~/store'

export default defineNuxtRouteMiddleware(to => {
  const authStore = useAuthStore()
  const { getCookie } = authHook()
  const { setToken, setJWTasUser } = authStore

  const cookieToken = getCookie()

  if (to.name && ['login', 'register'].includes(to.name as string)) {
    if (cookieToken.value) {
      if (cookieToken.value) {
        setToken(cookieToken.value)
        const { payload } = useJwt(cookieToken.value)

        if (payload.value) {
          setJWTasUser(payload.value)
        }
      }
      return navigateTo({
        name: RouteNames.LIST_EVENT,
      })
    }
  }
})
