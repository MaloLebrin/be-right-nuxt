import { uniq } from '@antfu/utils'
import { isAddressType } from '~/utils/address'
import { areAnswersType } from '~/utils/answer'
import { areEventTypes, isEventType } from '~/utils/event'
import type { AnswerType } from '~~/store'
import {
  useAddressStore,
  useAnswerStore,
  useCompanyStore,
  useEmployeeStore,
  useEventStore,
  useFileStore,
  useUiStore,
  useUserStore,
} from '~~/store'
import type { AddressType, EventCreatePayload, EventType } from '~~/types'

export default function eventHook() {
  const { $toast, $api, $pinia } = useNuxtApp()

  const { fetchManyAnswerForEvent } = answerHook()
  const { fetchEmployeesByEventId } = employeeHook()
  const { fetchMany: fetchManyUsers } = userHook()
  const { fetchMany: fetchManyAddress } = addressHook()
  const { fetchManyFiles } = fileHook()

  const eventStore = useEventStore($pinia)
  const { deleteEventAndRelations } = eventStore
  const { DecLoading, IncLoading } = useUiStore($pinia)
  const addressStore = useAddressStore($pinia)
  const employeeStore = useEmployeeStore($pinia)
  const userStore = useUserStore($pinia)
  const answerStore = useAnswerStore($pinia)
  const companyStore = useCompanyStore($pinia)
  const fileStore = useFileStore($pinia)
  const { createOne: createOneAddress } = addressStore

  function storeEventRelationEntities(events: EventType[]) {
    if (events?.length > 0) {
      const eventsToStore = events.map(event => {
        const address = event.address
        if (address) {
          if (!addressStore.isAlreadyInStore(address?.id)) {
            createOneAddress(address)
            delete event.address
          }
        }

        const partner = event.partner
        if (partner && !userStore.isAlreadyInStore(partner.id)) {
          userStore.createOne(partner)
          delete event.partner
        }

        const files = event.files
        if (files && files.length > 0) {
          const missingfiles = files.filter(file => !fileStore.isAlreadyInStore(file.id))
          fileStore.createMany(missingfiles)
          delete event.files
        }

        return {
          ...event,
        }
      })
      eventStore.addMany(eventsToStore)
      return eventsToStore
    }
    return []
  }

  async function fetchEventsByCompany() {
    IncLoading()
    const { data } = await $api().get<EventType[]>('event/user')

    if (data && areEventTypes(data)) {
      const missingIds = data
        .map((event: EventType) => event.id)
        .filter(id => !eventStore.isAlreadyInStore(id))

      if (missingIds.length > 0) {
        const events = data.filter(event => missingIds.includes(event.id))
        storeEventRelationEntities(events)
      }
    }
    DecLoading()
  }

  async function fetchOne(id: number) {
    IncLoading()
    const { data: event } = await $api().get<EventType>(`event/${id}`)

    if (event && isEventType(event) && !eventStore.isAlreadyInStore(event.id)) {
      storeEventRelationEntities([event])
    }
    DecLoading()
  }

  async function postOne(payload: EventCreatePayload): Promise<EventType | undefined> {
    const { data } = await $api().post<{
      event: EventType
      address: AddressType
      answers: AnswerType[]
    }>('event', payload)

    if (data) {
      const { event, address, answers } = data

      if (isEventType(event)) {
        eventStore.addMany([event])
      }

      if (isAddressType(address)) {
        addressStore.addOne(address)
      }

      if (areAnswersType(answers)) {
        answerStore.addMany(answers)
      }

      $toast?.success('L\'événement a été créé avec succès')
      return event
    }
    return undefined
  }

  async function patchOne(event: EventType) {
    if (event && event.id) {
      IncLoading()
      const { data } = await $api().patch<EventType>(`event/${event.id}`, event)
      if (data && isEventType(data)) {
        eventStore.updateOne(data.id, data)
        $toast?.success('L\'événement a été mis à jour avec succès')
      }
      DecLoading()
    }
  }

  async function deleteOne(id: number) {
    IncLoading()
    const { success } = await $api().delete(`event/${id}`)
    if (success) {
      deleteEventAndRelations(id)
    }
    $toast?.success('L\'événement a été supprimé avec succès')
    DecLoading()
  }

  async function fetchEventWithRelations(eventId: number) {
    IncLoading()

    if (!eventStore.isAlreadyInStore(eventId)) {
      await fetchOne(eventId)
    }

    await fetchManyAnswerForEvent(eventId)

    const answers = answerStore.getManyByEventId(eventId)

    if (answers && answers.length > 0) {
      const missingEmployeeIds = answers
        .map(answer => answer.employeeId)
        .filter(id => id && !employeeStore.isAlreadyInStore(id)) as number[]

      if (missingEmployeeIds && missingEmployeeIds.length > 0) {
        await fetchEmployeesByEventId(eventId)
      }
    }

    const event = eventStore.getOne(eventId)

    if (event) {
      if (event.partnerId && !userStore.isAlreadyInStore(event.partnerId)) {
        await fetchManyUsers([event.partnerId])
      }

      const missingAddressIds = []

      const company = companyStore.getAuthCompany
      if (company && company.addressId && !addressStore.isAlreadyInStore(company.addressId)) {
        missingAddressIds.push(company.addressId)
      }

      if (event.addressId && !addressStore.isAlreadyInStore(event.addressId)) {
        missingAddressIds.push(event.addressId)
      }

      employeeStore.getMany(answers
        .map(answer => answer.employeeId))
        .forEach(emp => missingAddressIds.push(emp.addressId))

      const uniqAddressIds = uniq(missingAddressIds).filter(id => !addressStore.isAlreadyInStore(id))

      if (uniqAddressIds?.length > 0) {
        await fetchManyAddress(uniqAddressIds)
      }

      if (event.filesIds?.length > 0) {
        const missingIds = fileStore.getMissingIds(event.filesIds)

        if (missingIds.length > 0) {
          await fetchManyFiles(missingIds)
        }
      }
    }

    DecLoading()
  }

  async function fetchMany(eventIds: number[]) {
    IncLoading()
    const ids = eventIds?.length > 1 ? uniq(eventIds) : eventIds
    if (ids?.length > 0) {
      const { data: events } = await $api().get<EventType[]>(`event/manyByIds?ids=${ids.join(',')}`)

      if (events && events.length > 0 && areEventTypes(events)) {
        storeEventRelationEntities(events)
      }
    }
    DecLoading()
  }

  async function fetchDeleted() {
    IncLoading()
    const { data } = await $api().get<EventType[]>('event/deleted')

    if (data && areEventTypes(data)) {
      const missingIds = data
        .map((event: EventType) => event.id)
        .filter(id => !eventStore.isAlreadyInStore(id))

      if (missingIds.length > 0) {
        const events = data.filter(event => missingIds.includes(event.id))
        storeEventRelationEntities(events)
      }
    }
    DecLoading()
  }

  async function syncEvent(eventId: number) {
    IncLoading()
    const { data } = await $api().patch<EventType>(`event/synchronise/${eventId}`, {})

    if (data && isEventType(data)) {
      eventStore.addMany([data])
      $toast?.success('L\'événement a été mis à jour avec succès')
    }
    DecLoading()
  }

  return {
    deleteOne,
    fetchDeleted,
    fetchEventsByCompany,
    fetchOne,
    fetchMany,
    isEventType,
    patchOne,
    postOne,
    syncEvent,
    storeEventRelationEntities,
    fetchEventWithRelations,
  }
}
