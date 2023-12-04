<template>
<div class="flex items-center sm:mt-0">
  <RadioGroup
    v-model="filter"
    class="hidden md:block"
  >
    <RadioGroupLabel class="sr-only">
      Choisissez votre filtre
    </RadioGroupLabel>
    <div class="flex items-center space-x-2">
      <RadioGroupOption
        v-for="status in eventStatusArray"
        :key="status"
        as="div"
        :name="status"
        :value="status"
      >
        <RadioGroupLabel
          as="label"
          class="cursor-pointer"
        >
          <EventStatusTag :status="status" />
        </RadioGroupLabel>
      </RadioGroupOption>
      <RadioGroupOption
        v-slot="{ active, checked }"
        as="div"
        :name="null"
        value=""
      >
        <div
          class="flex items-center justify-center px-2 py-2 text-sm font-medium uppercase border rounded-md cursor-pointer focus:outline-none sm:flex-1"
          :class="[active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                   checked ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50']"
        >
          <RadioGroupLabel as="label">
            tout
          </RadioGroupLabel>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
  <Listbox
    v-model="filter"
    class="md:hidden"
  >
    <div class="relative">
      <ListboxButton
        class="relative flex items-center w-full px-1 py-2 space-x-2 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        <span class="block capitalize truncate">{{ filter ? getEventStatusTranslation(filter) : 'Sélectionner un filtre' }}</span>
        <span
          class="flex items-center pointer-events-none"
        >
          <ChevronUpDownIcon
            class="w-5 h-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 overflow-auto text-sm bg-white rounded-md shadow-lg max-h-72 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active }"
            as="div"
            :name="null"
            value=""
          >
            <li
              class="relative flex py-2 pr-4 cursor-default select-none"
              :class="[
                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
              ]"
            >
              Tous
            </li>
          </ListboxOption>
          <ListboxOption
            v-for="status in eventStatusArray"
            :key="status"
            v-slot="{ active }"
            :name="status"
            :value="status"
            as="template"
          >
            <li
              class="relative flex py-2 pr-4 capitalize cursor-default select-none"
              :class="[
                getEventStatusColor(status),
                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
              ]"
            >
              {{ getEventStatusTranslation(status) }}
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</div>
</template>

<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/24/solid'
import EventStatusTag from '../EventStatusTag.vue'
import { type EventStatusEnum, eventStatusArray } from '~~/types'

const emit = defineEmits<{
  (e: 'setFilter', status: EventStatusEnum | undefined): void
}>()

const filter = ref<undefined | EventStatusEnum>(undefined)

const { getEventStatusTranslation, getEventStatusColor } = eventHook()

watch(() => filter.value, val => {
  emit('setFilter', val)
})
</script>
