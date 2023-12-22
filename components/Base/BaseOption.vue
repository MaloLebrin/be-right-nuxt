<template>
<ListboxOption
  v-slot="{ active, selected }"
  :value="value"
  as="template"
>
  <li
    class="relative px-4 py-2 text-gray-700 cursor-pointer select-none"
    :class="[
      active ? 'bg-gray-200' : '',
    ]"
  >
    <span
      class="block text-sm font-bold truncate text-blue dark:text-gray-100"
      :class="[
        selected ? 'font-medium' : 'font-normal',
      ]"
    >{{ name }}</span>
    <span
      v-if="selected"
      class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-700"
    >
      <CheckIcon
        class="w-6 h-6"
        aria-hidden="true"
      />
    </span>
  </li>
</ListboxOption>
</template>

<script lang="ts" setup>
import { ListboxOption } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'

// TODO Make this component generic

interface Props {
  value: any
  name: string
}

defineProps<Props>()
</script>
