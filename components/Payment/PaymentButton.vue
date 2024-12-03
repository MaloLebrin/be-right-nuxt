<template>
<button
  type="submit"
  :disabled="isDisabled"
  class="w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
  :class="[
    isDisabled ? '' : 'disabled:cursor-not-allowed disabled:opacity-50',
  ]"
  @click="submit"
>
  <BaseLoader v-if="isLoading" />
  <span v-else>Payer</span>
</button>
</template>

<script setup lang="ts">
import BaseLoader from '~/components/Base/BaseLoader.vue'
import { type EventTypeCreate, useFormStore } from '~/store'
import { type BaseAddressCreationForm, FormEnum } from '~/store/form/types'

interface Props {
  isLoading: boolean
  isDisabled: boolean
  stripeCustomerId: string
  nbRecipients: number
  priceId: string
}

const props = defineProps<Props>()
const formStore = useFormStore()
async function submit() {
  const { $api, $toast } = useNuxtApp()
  const {
    getFormState,
    getPhotographerId,
  } = formStore

  const { data } = await $api().post<{ sessionUrl: string }>('stripe/payment/payEvent', {
    event: getFormState(FormEnum.EVENT_FORM) as unknown as EventTypeCreate,
    address: getFormState(FormEnum.ADDRESS_FORM) as BaseAddressCreationForm,
    photographerId: getPhotographerId,
    priceId: props.priceId,
  })

  if (data) {
    const { sessionUrl } = data
    if (!sessionUrl) {
      $toast.danger('Une erreur est survenue lors de la création de la session de paiement')
      return
    }
    navigateTo(sessionUrl, { external: true })
  }
}
</script>
