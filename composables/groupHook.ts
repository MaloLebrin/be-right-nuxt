import { uniq } from '@antfu/utils'
import type { Group, GroupCreationPayload } from '~~/store'
import { useAuthStore, useEmployeeStore, useUiStore } from '~~/store'
import { useGroupStore } from '~~/store/group/groupStore'

export default function groupHook() {
  const { $toast, $api } = useNuxtApp()

  const { IncLoading, DecLoading } = useUiStore()
  const groupStore = useGroupStore()
  const employeeStore = useEmployeeStore()
  const authStore = useAuthStore()
  const { fetchMany: fetchManyEmployees } = employeeHook()

  const { addMany, deleteOne } = groupStore

  async function deleteGroup(id: number) {
    try {
      IncLoading()
      await $api().delete(`group/${id}`)
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

  async function fetchUserGroupsAndRelations() {
    IncLoading()
    if (groupStore.getIsEmpty) {
      await fetchByUser()
    }

    const missingEmployees = groupStore.getAllArray?.length > 0
      ? uniq(groupStore.getAllArray
        .reduce((acc, emp) => [...acc, ...emp?.employeeIds], [] as number[]))
        .filter(id => !employeeStore.isAlreadyInStore(id))
      : []

    if (missingEmployees.length > 0) {
      await fetchManyEmployees(missingEmployees)
    }

    DecLoading()
  }

  async function postOne(group: GroupCreationPayload) {
    IncLoading()
    try {
      const { data } = await $api().post<Group>('group', {
        group,
      })
      if (data) {
        addMany([data])
        $toast.success('Groupe créé avec succès')
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function postOneCSV(dataForm: FormData) {
    IncLoading()
    try {
      // const { data } = await $api().post<Group>('group/csv', dataForm, true)
      const res = await fetch('http://localhost:8080/group/csv', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.getToken}`,
          Accept: 'application/json',
          // 'Content-Type': 'multipart/form-data',
        },
        body: dataForm,
      })
      const data = await res.json()
      console.log(data, '<==== data')
      if (data) {
        addMany([data])
        $toast.success('Groupe créé avec succès')
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function patchOne(id: number, group: Partial<Group>) {
    IncLoading()
    try {
      const { data } = await $api().patch<Group>(`group/${id}`, {
        group,
      })
      if (data) {
        deleteOne(id)
        addMany([data])
        $toast.success('Groupe modifié avec succès')
      }
    } catch (error) {
      console.error(error)
      $toast.error('Une erreur est survenue')
    }
    DecLoading()
  }

  async function removeRecipient(employeeId: number, groupId: number) {
    IncLoading()
    try {
      if (employeeId && groupId) {
        const groupToUpdate = groupStore.getOne(groupId)

        const payload: Group = {
          ...groupToUpdate,
          employeeIds: groupToUpdate.employeeIds.filter(id => id !== employeeId),
        }

        const { data } = await $api().patch<Group>(`group/${groupId}`, {
          group: payload,
        })
        if (data) {
          deleteOne(groupId)
          addMany([data])
          $toast.success('Groupe modifié avec succès')
        }
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
    postOne,
    postOneCSV,
    patchOne,
    fetchByUser,
    fetchMany,
    fetchUserGroupsAndRelations,
    removeRecipient,
  }
}
