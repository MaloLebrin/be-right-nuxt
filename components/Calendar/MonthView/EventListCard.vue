<template>
<Popover
  as="div"
  class="relative"
>
  <PopoverButton
    class="flex group"
  >
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
      <div class="no-scroll-bar relative mx-5 mt-4 min-w-[315px] max-w[315px] bg-slate-200 overflow-y-scroll rounded-2xl bg-opacity-50 shadow-lg backdrop-blur">
        <div
          v-for="event in events"
          :key="event.id"
          class="flex items-center justify-between px-6 py-4 mb-2 space-y-1"
        >
          <div class="overflow-hidden">
            <h4 class="overflow-hidden text-base text-gray-500 capitalize hover:text-indigo-600">
              {{ event.name }}
            </h4>
            <time
              :datetime="event.start as unknown as string"
              class="text-xs font-thin"
            >
              {{ $toFormat(event.start, 'DD/MM/YY') }} - {{ $toFormat(event.end, 'DD/MM/YY') }}
            </time>
          </div>
          <NuxtLink
            :to="{ name: RouteNames.SHOW_EVENT_ID, params: { id: event.id } }"
            class="rounded-md bg-indigo-500 px-3 py-1.5 text-white"
          >
            Voir
          </NuxtLink>
        </div>

        <!-- <div class="relative px-6 mb-4">
          <EventProgressBar
            :status="event.status"
            :answers="answers"
          />
        </div> -->
      </div>
    </PopoverPanel>
  </transition>
</Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { type EventType } from '~~/store'
import { RouteNames } from '~~/helpers/routes'

interface Props {
  events: EventType[]
}

const props = defineProps<Props>()
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
