<template>
<div class="w-full px-4 py-16">
  <div class="w-full max-w-5xl mx-auto">
    <RadioGroup v-model="selected">
      <div class="items-center justify-center space-y-2 lg:flex lg:space-x-4 lg:space-y-0">
        <SubscriptionSelectorOption
          v-for="plan in plans"
          :key="plan.value"
          :plan="plan"
        />
      </div>
    </RadioGroup>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  RadioGroup,
} from '@headlessui/vue'
import { SubscriptionEnum } from '~/types'

interface Props {
  defaultPlan: SubscriptionEnum
}

const { defaultPlan } = withDefaults(defineProps<Props>(), {
  defaultPlan: SubscriptionEnum.BASIC,
})

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

const selected = ref(defaultPlan)
</script>
