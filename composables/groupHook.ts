import type { Group } from '~~/store'
import { useUiStore } from '~~/store'
import { useGroupStore } from '~~/store/group/groupStore'

export default function groupHook() {
  const { $toast, $api } = useNuxtApp()

  const { IncLoading, DecLoading } = useUiStore()
  const groupStore = useGroupStore()
  const { addMany, deleteOne } = groupStore

  async function deleteGroup(id: number) {
    try {
      IncLoading()
      await $api().delete(`user/${id}`)
      deleteOne(id)
      $toast.success('Groupe à été supprimé avec succès')
    } catch (error) {
      $toast.error('Une erreur est survenue')
      console.error(error)
    }
    DecLoading()
  }

  async function fetchByUser() {
    IncLoading()
    try {
      const { data: groups } = await $api().get<Group[]>('group/user')
      if (groups && groups.length > 0) {
        addMany(groups)
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function fetchOne(id: number) {
    IncLoading()
    try {
      const { data: group } = await $api().get<Group>(`group/${id}`)
      if (group) {
        addMany([group])
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function fetchMany(ids: number[]) {
    IncLoading()
    try {
      if (ids.length > 0) {
        const { data } = await $api().get<Group[]>(`group/manyByIds?ids=${ids.join(',')}`)

        if (data && data.length > 0) {
          addMany(data)
        }
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function fetchByEmployeeId(id: number) {
    IncLoading()
    try {
      const { data: groups } = await $api().get<Group[]>(`group/employeeId/${id}`)
      if (groups && groups.length > 0) {
        addMany(groups)
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  return {
    deleteGroup,
    fetchByEmployeeId,
    fetchByUser,
    fetchMany,
    fetchOne,
  }
}
