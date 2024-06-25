<!-- eslint-disable vue/prefer-separate-static-class -->
<template>
<section
  aria-labelledby="summary-heading"
  class="px-4 py-6 mt-16 rounded-lg bg-gray-50 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
>
  <h2
    id="summary-heading"
    class="text-lg font-medium text-gray-900"
  >
    Votre panier
  </h2>

  <dl
    v-if="unitPrice && nbRecipient !== null"
    class="mt-6 space-y-4"
  >
    <div class="flex items-center justify-between">
      <dt class="text-sm text-gray-600">
        Nombre de destinataires
      </dt>
      <dd class="text-sm font-medium text-gray-900">
        {{ nbRecipient }} / pers.
      </dd>
    </div>
    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
      <dt class="flex items-center text-sm text-gray-600">
        <span>Prix par destinataire</span>
        <a
          href="#"
          class="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">Learn more about how shipping is calculated</span>
          <QuestionMarkCircleIcon
            class="w-5 h-5"
            aria-hidden="true"
          />
        </a>
      </dt>
      <dd class="text-sm font-medium text-gray-900">
        {{ fromCent(unitPrice) }}€
      </dd>
    </div>
    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
      <dt class="text-base font-medium text-gray-900">
        Montant total
      </dt>
      <dd class="text-base font-medium text-gray-900">
        <p class="line-through ">
          {{ nbRecipient * fromCent(unitPrice) }}€
        </p>
        <p>0€</p>
      </dd>
    </div>
  </dl>

  <div class="mt-6">
    <PaymentButton
      v-if="userStore.getAuthUser?.stripeCustomerId && nbRecipient"
      :is-loading="uiStore.getUIIsLoading"
      :is-disabled="!isSubmitEnabled"
      :stripe-customer-id="userStore.getAuthUser?.stripeCustomerId"
      :nb-recipients="nbRecipient"
      :price-id="priceId"
    />
  </div>
</section>
</template>

<script setup lang="ts">
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
import PaymentButton from '~/components/Payment/PaymentButton.vue'
import { useFormStore, useUiStore, useUserStore } from '~/store'

interface Props {
  nbRecipient: number | null
  unitPrice: number | null
  priceId: string
}

withDefaults(defineProps<Props>(), {
  nbRecipient: null,
  unitPrice: null,
})

const uiStore = useUiStore()
const formStore = useFormStore()
const userStore = useUserStore()

const isSubmitEnabled = computed(() =>
  formStore.isStepPhotographerValid
  && formStore.isStepEventValid
  && formStore.isStepEmployeeValid
  && !uiStore.getUIIsLoading)
</script>
