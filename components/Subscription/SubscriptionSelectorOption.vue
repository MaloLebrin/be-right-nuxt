<template>
<RadioGroupOption
  v-slot="{ active, checked }"
  as="template"
  :value="plan.value"
  :disabled="plan.isUnAvailable"
>
  <div
    class="relative flex px-5 py-4 rounded-lg shadow-md focus:outline-none"
    :class="[
      active
        ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
        : '',
      checked ? 'bg-sky-900/75 text-white ' : 'bg-white ',
      plan.isUnAvailable ? 'cursor-not-allowed bg-gray-100 text-gray-500' : 'cursor-pointer',
    ]"
  >
    <div class="flex items-center justify-between w-full space-x-2">
      <div class="flex items-center">
        <div class="space-y-2 text-sm">
          <RadioGroupLabel
            as="p"
            :class="checked ? 'text-white' : 'text-gray-900'"
            class="font-medium"
          >
            {{ getSuscriptionTranslation(plan.value) }}
          </RadioGroupLabel>
          <RadioGroupDescription
            as="span"
            :class="checked ? 'text-sky-100' : 'text-gray-500'"
            class="inline"
          >
            <span>{{ plan.description }}</span>
          </RadioGroupDescription>
        </div>
      </div>
      <div
        v-show="checked"
        class="text-white shrink-0"
      >
        <CheckCircleIcon
          class="w-6 h-6"
        />
      </div>
    </div>
  </div>
</RadioGroupOption>
</template>

<script setup lang="ts">
import {
  RadioGroupDescription,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

interface Props {
  plan: any
}

const { plan } = defineProps<Props>()
</script>
