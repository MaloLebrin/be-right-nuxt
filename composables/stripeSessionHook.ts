import { type AddressType, type AnswerType, type EventType, useAddressStore, useAnswerStore, useEventStore, useUiStore } from '~/store'

export default function stripeSessionHook() {
  const { $api, $pinia } = useNuxtApp()
  const { DecLoading, IncLoading } = useUiStore($pinia)
  const addressStore = useAddressStore($pinia)
  const answerStore = useAnswerStore($pinia)
  const eventStore = useEventStore($pinia)

  async function getCheckoutSession(sessionId: string) {
    IncLoading()
    const { data } = await $api().get<{
      event: EventType
      address: AddressType
      answers: AnswerType[]
    }>(`stripe/payment/successfull/${sessionId}`)

    if (data) {
      const { event, address, answers } = data
      if (event) {
        eventStore.addMany([event])
        eventStore.setOneActive(event.id)
      }

      if (address) {
        addressStore.addOne(address)
      }

      if (answers) {
        answerStore.addMany(answers)
      }
    }

    DecLoading()
  }

  return {
    getCheckoutSession,
  }
}
