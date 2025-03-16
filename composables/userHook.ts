import type {
  ActionResponse,
  UserType,
} from '@/types'
import { isArrayUserType, isUserType } from '~/utils/user'
import type { Company } from '~~/store'
import {
  useCompanyStore,
  useNotificationsSubscriptionStore,
  useUiStore,
  useUserStore,
} from '~~/store'
import type { PhotographerCreatePayload } from '~~/store/form/types'

export default function userHook() {
  const { $toast, $api, $pinia } = useNuxtApp()

  const userStore = useUserStore($pinia)
  const companyStore = useCompanyStore($pinia)
  const notificationSubscriptionStore = useNotificationsSubscriptionStore($pinia)

  const { IncLoading, DecLoading } = useUiStore($pinia)

  async function fetchOne(userId: number) {
    IncLoading()
    const { data: user } = await $api().get<UserType>(`user/${userId}`)

    if (user && isUserType(user)) {
      storeUsersEntities(user, false)
    }
    DecLoading()
  }

  /**
   * function to store all objetcs or arrays user's entities, and set user to current
   * @param user
   * @param isUserToSetCurrent
   */
  function storeUsersEntities(user: UserType, isUserToSetCurrent = true) {
    if (user.notificationSubscriptions && user.notificationSubscriptions.length > 0) {
      const missingNotifSubscriptions = user.notificationSubscriptions.filter(notifSub => !notificationSubscriptionStore.isAlreadyInStore(notifSub.id))
      notificationSubscriptionStore.addMany(missingNotifSubscriptions)
    }

    if (isUserToSetCurrent) {
      userStore.setCurrent(user)
    }

    if (userStore.isAlreadyInStore(user.id)) {
      userStore.updateOne(user.id, user)
    } else {
      userStore.addOne(user)
    }
  }

  async function deleteUser(id: number) {
    IncLoading()
    await $api().delete(`user/${id}`)
    userStore.deleteOne(id)
    $toast.success('Utilisateurs à été supprimé avec succès')
    DecLoading()
  }

  async function patchOne(id: number, user: UserType) {
    IncLoading()
    const { data } = await $api().patch<UserType>(`user/${id}`, { user })
    if (data && isUserType(data)) {
      userStore.updateOneUser(id, data)
      $toast.success('Utilisateur à été modifié avec succès')
    }
    DecLoading()
  }

  async function fetchMany(ids: number[]) {
    IncLoading()
    if (ids.length > 0) {
      const { data: users } = await $api().get<UserType[]>(`user/many/?ids=${ids.join(',')}`)

      if (users && users.length > 0 && isArrayUserType(users)) {
        const missingsUsers = users.filter(user => !userStore.isAlreadyInStore(user.id))
        if (missingsUsers.length > 0) {
          userStore.addMany(missingsUsers)
        }
      }
    }
    DecLoading()
  }

  async function postPhotographer(photographer: PhotographerCreatePayload) {
    const { data } = await $api().post<UserType>('user/photographer', photographer)
    if (data && isUserType(data)) {
      userStore.addOne(data)
      return data
    }
  }

  async function getPhotographerUserWorkedWith() {
    const { data, success } = await $api().get<UserType[]>('user/partners')
    if (data && isArrayUserType(data) && success) {
      const partners = data.filter(user => !userStore.isAlreadyInStore(user.id))
      userStore.addMany(partners)
      return partners
    }
    return []
  }

  async function postUserSignature(base64Signature: string, userId: number) {
    IncLoading()
    const { data, success } = await $api().patch<{ user: UserType; company: Company }>(`user/signature/${userId}`, { signature: base64Signature })
    if (data && success && isUserType(data)) {
      const { user } = data
      storeUsersEntities(user)
      $toast.success('Signature enregistrée avec succès')
    }
    DecLoading()
  }

  async function restoreUser(userId: number) {
    IncLoading()
    const { data } = await $api().get<UserType>(`admin/user/restore/${userId}`)
    if (data) {
      if (userStore.isAlreadyInStore(userId)) {
        userStore.updateOneUser(userId, data)
      } else {
        userStore.addMany([data])
      }
    }
    DecLoading()
  }

  async function deleteForEver(userId: number) {
    IncLoading()
    const { data } = await $api().delete<ActionResponse>(`admin/user/deleteForEver/${userId}`)
    const user = userStore.getOne(userId)
    if (user && data?.isSuccess) {
      userStore.deleteOne(userId)
      companyStore.deleteOne(user.companyId)
    }
    DecLoading()
  }

  return {
    deleteUser,
    deleteForEver,
    fetchMany,
    fetchOne,
    getPhotographerUserWorkedWith,
    patchOne,
    postPhotographer,
    postUserSignature,
    restoreUser,
    storeUsersEntities,
  }
}
