import { useAuthStore } from '~~/store'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // if (from.name !== to.name) {
  if (to.meta.isAuth && !authStore.getIsLoggedIn) {
    return navigateTo({
      name: 'login',
    })
  }
  // }
})
