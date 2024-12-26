<template>
<div
  v-if="subscription"
  class="relative flex mt-px sm:col-start-3"
>
  <div :class="`flex flex-col p-2 overflow-y-auto text-xs leading-5 rounded-lg group inset-1 bg-${getSubscriptionColor()}-50 hover:bg-${getSubscriptionColor()}-100`">
    <p :class="`text-${getSubscriptionColor()}-500 group-hover:text-${getSubscriptionColor()}-700 font-semibold`">
      {{ getSuscriptionTranslation(subscription) }}
    </p>
  </div>
</div>
</template>

<script setup lang="ts">
import { SubscriptionEnum } from '~/types'

interface Props {
  subscription?: SubscriptionEnum
}

const { subscription } = defineProps<Props>()

function getSubscriptionColor() {
  switch (subscription) {
    case SubscriptionEnum.BASIC:
      return 'red'
    case SubscriptionEnum.PREMIUM:
      return 'lime'
    default:
      return 'gray'
  }
}
</script>
