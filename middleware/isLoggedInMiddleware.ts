import { RouteNames } from '~/helpers/routes'
import { useAuthStore } from '~~/store'

export default defineNuxtRouteMiddleware(to => {
  const authStore = useAuthStore()
  const { getCookie } = authHook()

  const cookieToken = getCookie()

  if (to.name && ['login', 'register'].includes(to.name)) {
    if (authStore.getIsLoggedIn || cookieToken.value) {
      return navigateTo({
        name: RouteNames.LIST_EVENT,
      }, { replace: true })
    }
  }
})
