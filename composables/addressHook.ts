import type { AddressPostPayload, AddressType, WithoutId } from '@/types'
import { areAddressType, isAddressType } from '~/utils/address'
import { useAddressStore, useCompanyStore, useUiStore } from '~~/store'

export default function addressHook() {
  const { $toast, $api, $pinia } = useNuxtApp()

  const { IncLoading, DecLoading } = useUiStore($pinia)
  const addressStore = useAddressStore($pinia)
  const { updateOneCompany } = useCompanyStore($pinia)
  const { updateOneAddress, addOne, addMany } = addressStore

  async function fetchOne(id: number) {
    IncLoading()
    const { data: address } = await $api().get<AddressType>(`address/${id}`)
    if (address && isAddressType(address)) {
      addOne(address)
    }
    DecLoading()
  }

  async function fetchMany(ids: number[]) {
    IncLoading()
    if (ids.length > 0) {
      const { data } = await $api().get<AddressType[]>(`address/manyByIds?ids=${ids.join(',')}`)

      if (data && data.length > 0 && areAddressType(data)) {
        addMany(data)
      }
    }
    DecLoading()
  }

  async function postOne(payload: AddressPostPayload) {
    IncLoading()
    const { data: address } = await $api().post<AddressType>('address/', payload as unknown as WithoutId<AddressType>)
    if (address && isAddressType(address)) {
      addOne(address)
    }

    if (payload.companyId) {
      updateOneCompany(payload.companyId, {
        addressId: address?.id,
      })
    }
    DecLoading()
  }

  async function patchOne(id: number, payload: Partial<AddressType>) {
    IncLoading()
    const { data: address } = await $api().patch<AddressType>(`address/${id}`, { address: payload })
    if (address && isAddressType(address)) {
      updateOneAddress(id, address)
      $toast.success('Adresse mise à jour')
    }
    DecLoading()
  }

  return {
    fetchOne,
    fetchMany,
    isAddressType,
    patchOne,
    postOne,
  }
}
