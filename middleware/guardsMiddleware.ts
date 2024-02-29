import { useJwt } from '@vueuse/integrations/useJwt'
import { useAuthStore } from '~~/store'

export default defineNuxtRouteMiddleware(async to => {
  const { $toast } = useNuxtApp()
  const authStore = useAuthStore()
  const { setToken, setJWTasUser } = authStore
  const { getCookie } = authHook()

  const cookieToken = getCookie()

  if (authStore.getIsLoggedIn) {
    return
  }

  if (to.meta.isAuth && !authStore.getIsLoggedIn) {
    if (cookieToken.value) {
      setToken(cookieToken.value)
      const { payload } = useJwt(cookieToken.value)

      if (payload.value) {
        setJWTasUser(payload.value)
      }
      return
    }

    $toast?.denied('Vous n\'êtes pas connecté')
    return redirectToLogin()
  }

  if (to.meta.isAdmin && !authStore.isAuthUserAdmin) {
    return redirectToLogin()
  }
})

function redirectToLogin() {
  abortNavigation()
  return navigateTo({
    name: 'login',
  }, { replace: true })
}
