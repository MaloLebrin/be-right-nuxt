<template>
<header class="flex items-center justify-between px-6 py-4 border-b border-gray-200 lg:flex-none">
  <h1 class="text-base font-semibold leading-6 text-gray-900 capitalize">
    <time :datetime="calendarStore.getCurrentDate">
      {{ $toFormat(calendarStore.getCurrentDate, 'DD MMMM YYYY') }}
    </time>
  </h1>
  <div class="flex items-center">
    <div class="relative flex items-center bg-white rounded-md shadow-sm md:items-stretch">
      <button
        type="button"
        class="flex items-center justify-center w-12 pr-1 text-gray-400 border-l border-gray-300 h-9 rounded-l-md border-y hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
        @click="setPreviousMonth"
      >
        <span class="sr-only">Previous month</span>
        <ChevronLeftIcon
          class="w-5 h-5"
          aria-hidden="true"
        />
      </button>
      <button
        type="button"
        class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
        @click="setToday"
      >
        Today
      </button>
      <span class="relative w-px h-5 -mx-px bg-gray-300 md:hidden" />
      <button
        type="button"
        class="flex items-center justify-center w-12 pl-1 text-gray-400 border-r border-gray-300 h-9 rounded-r-md border-y hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
        @click="setNextMonth"
      >
        <span class="sr-only">Next month</span>
        <ChevronRightIcon
          class="w-5 h-5"
          aria-hidden="true"
        />
      </button>
    </div>
    <div class="hidden md:ml-4 md:flex md:items-center">
      <Menu
        as="div"
        class="relative"
      >
        <MenuButton
          type="button"
          class="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {{ getCurrentViewLabel() }}
          <ChevronUpDownIcon
            class="w-5 h-5 -mr-1 text-gray-400"
            aria-hidden="true"
          />
        </MenuButton>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems class="absolute right-0 z-10 mt-3 overflow-hidden origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:-none">
            <div class="py-1">
              <MenuItem>
                <NuxtLink
                  :to="{
                    name: RouteNames.EVENT_CALENDAR_WEEK_VIEW,
                    query: {
                      ...$route.query,
                    },
                  }"
                  :disabled="$route.name === RouteNames.EVENT_CALENDAR_WEEK_VIEW"
                  class="block px-4 py-2 text-sm"
                  :class="[$route.name === RouteNames.EVENT_CALENDAR_WEEK_VIEW ? 'bg-gray-100 text-gray-900' : 'text-gray-700']"
                >
                  Vue semaine
                </NuxtLink>
              </MenuItem>
              <MenuItem>
                <NuxtLink
                  :to="{
                    name: RouteNames.EVENT_CALENDAR_MONTH_VIEW,
                    query: {
                      ...$route.query,
                    },
                  }"
                  :disabled="$route.name === RouteNames.EVENT_CALENDAR_MONTH_VIEW"
                  class="block px-4 py-2 text-sm"
                  :class="[$route.name === RouteNames.EVENT_CALENDAR_MONTH_VIEW ? 'bg-gray-100 text-gray-900' : 'text-gray-700']"
                >
                  Vue mois
                </NuxtLink>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <div class="w-px h-6 ml-6 bg-gray-300" />
      <NuxtLink
        :to="{ name: RouteNames.CREATE_EVENT_STEP_1 }"
        class="px-3 py-2 ml-6 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible: focus-visible:-2 focus-visible:-offset-2 focus-visible:-indigo-500"
      >
        Add event
      </NuxtLink>
    </div>
    <Menu
      as="div"
      class="relative ml-6 md:hidden"
    >
      <MenuButton class="flex items-center p-2 -mx-2 text-gray-400 border border-transparent rounded-full hover:text-gray-500">
        <span class="sr-only">Open menu</span>
        <EllipsisHorizontalIcon
          class="w-5 h-5"
          aria-hidden="true"
        />
      </MenuButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems class="absolute right-0 z-10 mt-3 overflow-hidden origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:-none">
          <div class="py-1">
            <MenuItem>
              <NuxtLink
                :to="{ name: RouteNames.CREATE_EVENT_STEP_1 }"
                class="block px-4 py-2 text-sm"
              >
                Create event
              </NuxtLink>
            </MenuItem>
          </div>
          <div class="py-1">
            <MenuItem
              disabled
            >
              <a
                href="#"
                class="block px-4 py-2 text-sm"
              >Vue Jour</a>
            </MenuItem>
            <MenuItem>
              <NuxtLink
                :to="{
                  name: RouteNames.EVENT_CALENDAR_WEEK_VIEW,
                  query: {
                    ...$route.query,
                  },
                }"
                :disabled="$route.name === RouteNames.EVENT_CALENDAR_WEEK_VIEW"
                class="block px-4 py-2 text-sm"
                :class="[$route.name === RouteNames.EVENT_CALENDAR_WEEK_VIEW ? 'bg-gray-100 text-gray-900' : 'text-gray-700']"
              >
                Vue semaine
              </NuxtLink>
            </MenuItem>
            <MenuItem>
              <NuxtLink
                :to="{
                  name: RouteNames.EVENT_CALENDAR_MONTH_VIEW,
                  query: {
                    ...$route.query,
                  },
                }"
                :disabled="$route.name === RouteNames.EVENT_CALENDAR_MONTH_VIEW"
                class="block px-4 py-2 text-sm"
                :class="[$route.name === RouteNames.EVENT_CALENDAR_MONTH_VIEW ? 'bg-gray-100 text-gray-900' : 'text-gray-700']"
              >
                Vue mois
              </NuxtLink>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</header>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronLeftIcon, ChevronRightIcon, ChevronUpDownIcon, EllipsisHorizontalIcon } from '@heroicons/vue/20/solid'
import { useCalendarStore } from '~~/store'
import { RouteNames } from '~~/helpers/routes'

const calendarStore = useCalendarStore()
const {
  setPreviousMonth,
  setNextMonth,
  setToday,
} = calendarStore

const route = useRoute()

const getCurrentViewLabel = () => {
  switch (route.name) {
    case RouteNames.EVENT_CALENDAR_MONTH_VIEW:
      return 'Vue mois'
    case RouteNames.EVENT_CALENDAR_WEEK_VIEW:
      return 'Vue semaine'
    default:
      return 'Vue mois'
  }
}
</script>
