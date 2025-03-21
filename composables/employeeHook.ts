import type { AddressType, EmployeeDeleteRequest, EmployeeType, FileType } from '@/types'
import { isArrayOfNumbers } from '~~/utils'

import {
  useAddressStore,
  useCompanyStore,
  useEmployeeStore,
  useFileStore,
  useGroupStore,
  useUiStore,
} from '~~/store'
import { isAddressType } from '~/utils/address'
import { areEmployeeTypes, isEmployeeType } from '~/utils/employee'

export default function employeeHook() {
  const { $toast, $api, $pinia } = useNuxtApp()

  const employeeStore = useEmployeeStore($pinia)
  const companyStore = useCompanyStore($pinia)
  const { createMany: createManyFiles } = useFileStore($pinia)
  const { IncLoading, DecLoading } = useUiStore($pinia)
  const addressStore = useAddressStore($pinia)
  const { addMany: addManyAddresses } = addressStore
  const groupStore = useGroupStore($pinia)
  const { filteringFilesNotInStore } = fileHook()

  function storeEmployeeRelationsEntities(employees: EmployeeType[]): EmployeeType[] {
    if (employees?.length > 0) {
      const missingIds = employees
        .map(employee => employee.id)
        .filter(id => !employeeStore.isAlreadyInStore(id))

      if (missingIds.length > 0) {
        // TODO : optimize this with reduce
        const employeesToStore = employees
          .filter(employee => missingIds.includes(employee.id))

        employeesToStore.forEach(employee => {
          // let employeeAnswers: AnswerType[] = []
          let employeeFiles: FileType[] = []

          if (employee.files && employee.files.length > 0 && !isArrayOfNumbers(employee.files)) {
            employeeFiles = filteringFilesNotInStore(employee.files as FileType[])
            if (employeeFiles.length > 0) {
              createManyFiles(employeeFiles)
            }
          }

          if (employee.address && isAddressType(employee.address)) {
            if (!addressStore.isAlreadyInStore(employee.addressId)) {
              addManyAddresses([employee.address])
            }
          }
        })
        employeeStore.addMany(employeesToStore)
        return employeesToStore
      }
    }
    return []
  }

  async function fetchOne(id: number) {
    IncLoading()
    const { data } = await $api().get<EmployeeType>(`employee/${id}`)
    if (data && isEmployeeType(data)) {
      storeEmployeeRelationsEntities([data])
    }
    DecLoading()
  }

  async function fetchEmployeesByEventId(eventId: number) {
    IncLoading()
    const { data } = await $api().get<EmployeeType[]>(`employee/event/${eventId}`)

    if (data && areEmployeeTypes(data)) {
      employeeStore.addMany(data)
    }
    DecLoading()
  }

  async function fetchMany(employeeIds: number[]) {
    IncLoading()
    if (employeeIds.length > 0) {
      const { data } = await $api().get<EmployeeType[]>(`employee/manyByIds?ids=${employeeIds.join(',')}`)

      if (data && data.length > 0 && areEmployeeTypes(data)) {
        const missingsEmployees = data.filter(user => !employeeStore.isAlreadyInStore(user.id))

        if (missingsEmployees.length > 0) {
          employeeStore.addMany(missingsEmployees)
        }
      }
    }
    DecLoading()
  }

  async function fetchAllByUserId(userId: number) {
    IncLoading()
    const { data } = await $api().get<EmployeeType[]>(`employee/user/${userId}`)

    if (data && areEmployeeTypes(data)) {
      storeEmployeeRelationsEntities(data)
    }
    DecLoading()
  }

  async function deleteOne(id: number) {
    IncLoading()
    const { data } = await $api().delete<EmployeeDeleteRequest>(`employee/${id}`)
    if (data) {
      const { groups, company } = data
      companyStore.updateOneCompany(company.id, company)
      groupStore.updateManyGroups(groups)
    }

    employeeStore.deleteOneEmployee(id)
    $toast.success('Destinataire supprimé avec succès')
    DecLoading()
  }

  async function deleteOneForEver(id: number) {
    IncLoading()
    const { data } = await $api().delete<EmployeeDeleteRequest>(`admin/employee/deleteForEver/${id}`)

    if (data) {
      const { groups, company } = data
      companyStore.updateOneCompany(company.id, company)
      groupStore.updateManyGroups(groups)
    }

    employeeStore.deleteOneEmployee(id)
    $toast.success('Destinataire supprimé définitivement avec succès')
    DecLoading()
  }

  async function patchOne(id: number, payload: EmployeeType) {
    IncLoading()
    const { data } = await $api().patch<EmployeeType>(`employee/${id}`, payload)
    if (data && isEmployeeType(data)) {
      employeeStore.updateOne(id, data)
      $toast.success('Destinataire modifié avec succès')
    }
    DecLoading()
  }

  async function postOne(employee: EmployeeType, address: AddressType) {
    const { data } = await $api().post<EmployeeType>('employee', { employee, address })

    if (data && isEmployeeType(data)) {
      const company = companyStore.getAuthCompany
      if (company) {
        companyStore.updateOneCompany(company.id, {
          employeeIds: [...company.employeeIds, data.id],
        })
      }
      employeeStore.addMany([data])
      $toast.success('Destinataire créé avec succès')
      return data
    }
    return null
  }

  async function postManyForEvent(employees: EmployeeType[], eventId: number, userId: number) {
    IncLoading()
    const { data } = await $api().post<EmployeeType[]>(`employee/manyonevent/${eventId}/${userId}`, employees)

    if (data && areEmployeeTypes(data)) {
      const company = companyStore.getAuthCompany
      if (company) {
        companyStore.updateOneCompany(company.id, {
          employeeIds: [...company.employeeIds, ...data.map(emp => emp.id)],
        })
      }
      employeeStore.addMany(data)
      $toast.success('Destinataires créés avec succès')
    }
    DecLoading()
  }

  async function postOneAdminForUser(
    { employee, address, userId }: { employee: EmployeeType; address: AddressType; userId: number }) {
    const { data } = await $api().post<EmployeeType>('admin/employee', { employee, address, userId })

    if (data && isEmployeeType(data)) {
      employeeStore.addMany([data])
      $toast.success('Destinataire créé avec succès')
    }
    return null
  }

  async function restoreEmployee(employeeId: number) {
    IncLoading()
    const { data } = await $api().get<EmployeeType>(`employee/restore/${employeeId}`)

    if (data && isEmployeeType(data)) {
      if (employeeStore.isAlreadyInStore(employeeId)) {
        employeeStore.updateOne(employeeId, data)
      } else {
        employeeStore.addMany([data])
      }
      $toast.success('Destinataire restauré avec succès')
    }
    DecLoading()
  }

  return {
    deleteOne,
    deleteOneForEver,
    fetchAllByUserId,
    fetchOne,
    fetchMany,
    fetchEmployeesByEventId,
    patchOne,
    postManyForEvent,
    postOne,
    postOneAdminForUser,
    restoreEmployee,
    storeEmployeeRelationsEntities,
  }
}
