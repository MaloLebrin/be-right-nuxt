<template>
<Popover
  as="div"
  class="relative"
>
  <PopoverButton class="flex overflow-hidden group">
    <p class="flex-auto font-medium text-gray-900 truncate group-hover:text-indigo-600">
      <span class="truncate">{{ event.name }}</span>
    </p>
  </PopoverButton>

  <transition
    enter-active-class="transition ease-out duration-800"
    enter-from-class="translate-y-1 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition ease-in duration-250"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-1 opacity-0"
  >
    <PopoverPanel class="absolute z-10 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
      <div class="no-scroll-bar relative mx-5 mt-4 min-w-[315px] max-w[315px] bg-slate-200 overflow-y-scroll rounded-2xl bg-opacity-50 shadow-lg backdrop-blur">
        <CalendarEventCardHeader :event="event" />
        <CalendarEventContent
          :event="event"
          :answers="answers"
        />
      </div>
    </PopoverPanel>
  </transition>
</Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import type {  AnswerType, EventType } from '~~/store'
import CalendarEventCardHeader from '~~/components/Calendar/EventCard/Header.vue'
import CalendarEventContent from '~~/components/Calendar/EventCard/Content.vue'

interface Props {
  event: EventType
  answers: AnswerType[]
}

defineProps<Props>()
</script>

<style scoped>
.no-scroll-bar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scroll-bar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
