<template>
<Popover
  as="div"
  class="relative"
>
  <PopoverButton class="flex group">
    <p class="font-light text-gray-500">
      + {{ events.length }} more
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
      <div
        v-if="events.length === 1"
        class="no-scroll-bar relative mx-5 mt-4 min-w-[315px] max-w[315px] bg-slate-200 overflow-y-scroll rounded-2xl bg-opacity-50 shadow-lg backdrop-blur"
      >
        <CalendarEventCardHeader
          :event="events[0]"
        />
        <CalendarEventContent
          :event="events[0]"
          :answers="getAnswers(events[0].id).value"
        />
      </div>
      <template v-else>
        <Disclosure
          v-for="event in events"
          :key="event.id"
          as="div"
          class="no-scroll-bar relative mx-5 mt-4 min-w-[315px] max-w[315px] bg-slate-200 overflow-y-scroll rounded-2xl bg-opacity-50 shadow-lg backdrop-blur"
        >
          <DisclosureButton class="w-full">
            <CalendarEventCardHeader
              :event="event"
            />
          </DisclosureButton>
          <DisclosurePanel>
            <CalendarEventContent
              :event="event"
              :answers="getAnswers(event.id).value"
            />
          </DisclosurePanel>
        </Disclosure>
      </template>
    </PopoverPanel>
  </transition>
</Popover>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { type EventType, useAnswerStore } from '~~/store'
import CalendarEventCardHeader from '~~/components/Calendar/EventCard/Header.vue'
import CalendarEventContent from '~~/components/Calendar/EventCard/Content.vue'

interface Props {
  events: EventType[]
}

defineProps<Props>()

const answerStore = useAnswerStore()
const getAnswers = (eventId: number) => computed(() => answerStore.getManyByEventId(eventId))
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
