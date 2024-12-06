import { RouteNames } from '~/helpers/routes'
import { useAuthStore } from '~~/store'

export default defineNuxtRouteMiddleware(to => {
  const authStore = useAuthStore()
  const { getCookie } = authHook()

  const cookieToken = getCookie()

  if (to.name && ['login', 'register'].includes(to.name as string)) {
    if (authStore.getIsLoggedIn || cookieToken.value) {
      return navigateTo({
        name: RouteNames.LIST_EVENT,
      })
    }
  }
})
