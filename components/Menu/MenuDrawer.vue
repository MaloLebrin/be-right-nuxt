<template>
<div class="shadow-xl">
  <TransitionRoot
    as="template"
    :show="uiStore.getIsDrawerOpen"
  >
    <Dialog
      as="div"
      class="fixed inset-0 z-40 flex lg:hidden"
      @close="closeDrawer"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>
      <TransitionChild
        as="template"
        enter="transition ease-in-out duration-300 transform"
        enter-from="-translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="-translate-x-full"
      >
        <div class="relative flex flex-col flex-1 w-full max-w-xs bg-white">
          <TransitionChild
            as="template"
            enter="ease-in-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in-out duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="absolute top-0 pt-2 -mr-12 right-12">
              <button
                type="button"
                data-cy="close-drawer-button"
                class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                @click="closeDrawer"
              >
                <span class="sr-only">Close sidebar</span>
                <XCircleIcon
                  class="w-6 h-6 text-black"
                  aria-hidden="true"
                />
              </button>
            </div>
          </TransitionChild>
          <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-4">
              <SimpleLogo class="text-white" />
            </div>
            <MenuBasic />
          </div>
        </div>
      </TransitionChild>
      <div class="flex-shrink-0 w-14">
        <!-- Force sidebar to shrink to fit close icon -->
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <aside class="hidden h-full bg-white shadow-xl lg:fixed dark:bg-gray-800 lg:flex lg:w-64 lg:flex-col">
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div class="flex flex-col flex-1 w-full min-h-0 space-y-4">
      <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-visible">
        <div class="flex items-center flex-shrink-0 px-4">
          <SimpleLogo />
        </div>
        <MenuBasic />
      </div>

      <UserMenu />
    </div>
  </aside>
</div>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XCircleIcon } from '@heroicons/vue/24/outline'
import MenuBasic from './MenuBasic.vue'
import SimpleLogo from '~/components/Logo/SimpleLogo.server.vue'
import UserMenu from '~/components/User/UserMenu.vue'
import { useUiStore } from '~~/store'

const uiStore = useUiStore()

const { closeDrawer } = uiStore
</script>
