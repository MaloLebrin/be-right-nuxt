import { useJwt } from '@vueuse/integrations/useJwt'
import type { JwtPayload } from 'jsonwebtoken'
import type { ActionResponse, UserType, ValidationRequest } from '@/types'
import { RoleEnum } from '@/types'
import type { Company } from '~~/store'
import {
  useAddressStore,
  useAnswerStore,
  useAuthStore,
  useCompanyStore,
  useEmployeeStore,
  useEventStore,
  useFileStore,
  useFormStore,
  useGroupStore,
  useNotificationsStore,
  useNotificationsSubscriptionStore,
  useTableStore,
  useUiStore,
  useUserStore,
} from '~~/store'

export default function authHook() {
  const { $toast, $api } = useNuxtApp()

  const addressStore = useAddressStore()
  const answerStore = useAnswerStore()
  const userStore = useUserStore()
  const companyStore = useCompanyStore()
  const notificationStore = useNotificationsStore()
  const notificationSubscriptionStore = useNotificationsSubscriptionStore()
  const employeeStore = useEmployeeStore()
  const eventStore = useEventStore()
  const fileStore = useFileStore()
  const formStore = useFormStore()
  const groupStore = useGroupStore()
  const tableStore = useTableStore()
  const uiStore = useUiStore()
  const router = useRouter()
  const { resetAuthState, setJWTasUser, setToken, removeLoggedUser } = useAuthStore()
  const { storeUsersEntities } = userHook()
  const { storeCompanyEntities } = companyHook()
  const { closeSSE } = notificationSSEHook()

  async function logout() {
    closeSSE()
    await $api().post<ActionResponse>('auth/logout', { })
    removeLoggedUser()
    const cookieToken = useCookie('userToken')
    cookieToken.value = null
    $api().deleteCredentials()
    router.replace({ name: 'index' })

    addressStore.resetState()
    answerStore.resetState()
    companyStore.$reset()
    employeeStore.resetState()
    eventStore.resetState()
    fileStore.resetState()
    formStore.resetState()
    groupStore.resetState()
    notificationStore.$reset()
    notificationSubscriptionStore.$reset()
    tableStore.resetTableState()
    uiStore.resetUIState()
    userStore.resetState()

    resetAuthState()
    $toast?.success('Vous êtes déconnecté')
  }

  async function checkMailIsAlreadyExist(email: string) {
    const { data } = await $api().post<ValidationRequest>('user/isMailAlreadyExist', { email })
    return data
  }

  function jwtDecode(jwt: Ref<string> | MaybeRefOrGetter<string>) {
    const { payload } = useJwt(jwt as any)
    return payload
  }

  function isJWTUserAdmin(user: JwtPayload) {
    return user?.roles.includes(RoleEnum.ADMIN)
  }

  async function logWithToken(token: string) {
    const { data } = await $api().post<{ user: UserType; company: Company }>('user/token', { token })
    if (data) {
      const { user, company } = data

      if (company) {
        storeCompanyEntities(company)
      }

      if (user && user.token) {
        setToken(user.token)
        storeUsersEntities(user, false)

        const decoded = jwtDecode(ref(user.token))

        if (decoded.value) {
          setJWTasUser(decoded.value)
          return decoded.value
        }
      }
    }
  }

  function getCookie() {
    const cookie = useCookie(
      'userToken',
      { secure: true, sameSite: true, path: '', maxAge: 604800 })
    return cookie
  }

  return {
    checkMailIsAlreadyExist,
    getCookie,
    isJWTUserAdmin,
    jwtDecode,
    logout,
    logWithToken,
  }
}
