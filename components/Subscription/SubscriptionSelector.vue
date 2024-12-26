<template>
<div class="w-full px-4 py-16">
  <form
    class="w-full max-w-5xl mx-auto space-y-4 place-items-center"
    @submit.prevent="updateSubscription"
  >
    <RadioGroup v-model="selected">
      <div class="items-center justify-center space-y-2 lg:flex lg:space-x-4 lg:space-y-0">
        <SubscriptionSelectorOption
          v-for="plan in plans"
          :key="plan.value"
          :plan="plan"
        />
      </div>
    </RadioGroup>

    <ClientOnly>
      <DatePicker
        v-model="exiprationDate"
        color="purple"
        is-required
        locale="fr"
        mode="date"
      />
    </ClientOnly>

    <BaseButton
      type="submit"
      :disabled="isDisabled"
    >
      Enregistrer
    </BaseButton>
  </form>
</div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import 'v-calendar/dist/style.css'
import { DatePicker } from 'v-calendar'
import {
  RadioGroup,
} from '@headlessui/vue'
import { SubscriptionEnum, type SubscriptionType } from '~/types'

interface Props {
  subscription: SubscriptionType | null
}

const { subscription } = defineProps<Props>()

const plans = [
  {
    value: SubscriptionEnum.BASIC,
    description: 'Ne payer que ce que vous consommer !',
  },
  {
    value: SubscriptionEnum.PREMIUM,
    description: 'Vous avez besoin d\'un plan sur mesure ?',
  },
]

const { isSameDay } = dateHook()

const selected = ref(subscription?.type || SubscriptionEnum.BASIC)
const exiprationDate = ref(subscription?.expireAt || dayjs().add(1, 'month').toDate())

const isDisabled = computed(() => {
  return subscription?.type === selected.value && isSameDay(subscription?.expireAt, exiprationDate.value)
})

async function updateSubscription() {
  if (subscription) {
    const {
      updateSubscription,
    } = subscriptionHook()

    await updateSubscription({
      ...subscription,
      type: selected.value,
      expireAt: exiprationDate.value,
    })
  }
}
</script>
