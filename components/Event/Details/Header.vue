<template>
<header class="py-8 rounded-t-lg bg-gray-50">
  <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
    <div class="flex-1 min-w-0">
      <div class="flex items-center space-x-10">
        <h1 class="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {{ event.name }}
        </h1>
        <EventStatusTag :status="event.status" />
      </div>
      <div class="flex flex-col mt-1 sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
        <div
          v-if="eventAddress"
          class="flex items-center mt-2 text-sm text-gray-500"
        >
          <MapPinIcon
            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          {{ eventAddress?.city }}
        </div>
        <div class="flex items-center mt-2 text-sm text-gray-500">
          <CalendarDaysIcon
            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          {{ getDateEventDisplay }}
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center mt-0 space-y-4 md:mt-5">
      <div class="flex items-center justify-center mt-5 space-x-4 md:flex-row xl:mt-0 xl:ml-4">
        <BaseButton
          :href="{
            name: 'evenement-edit-id',
            params: { id: event?.id.toString() },
          }"
        >
          <template #icon>
            <PencilSquareIcon
              class="w-5 h-5"
              aria-hidden="true"
            />
          </template>
          Modifier
        </BaseButton>
        <BaseButton
          color="white"
          :is-loading="uiStore.getUIIsLoading"
          :disabled="uiStore.getUIIsLoading"
          @click="syncEvent(event.id)"
        >
          <template #icon>
            <ArrowPathIcon
              class="w-5 h-5"
              aria-hidden="true"
            />
          </template>
          Synchroniser
        </BaseButton>
        <BaseButton
          color="red"
          @click="deleteEvent"
        >
          <template #icon>
            <ArchiveBoxIcon
              class="w-5 h-5"
              aria-hidden="true"
            />
          </template>
          Archiver
        </BaseButton>
      </div>
      <EmployeeCreator
        v-if="authStore.isAuthUserAdmin"
        :employee-creator="userStore.getOne(companyStore.getOne(event.companyId).userIds[0])"
      />
    </div>
  </div>
</header>
</template>

<script setup lang="ts">
import {
  ArchiveBoxIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  MapPinIcon,
  PencilSquareIcon,
} from '@heroicons/vue/24/outline'
import BaseButton from '~/components/Base/BaseButton.vue'
import EventStatusTag from '~/components/Event/EventStatusTag.vue'
import EmployeeCreator from '~/components/Employee/EmployeeCreator.vue'
import {
  useAddressStore,
  useAuthStore,
  useCompanyStore,
  useUiStore,
  useUserStore,
} from '~~/store'
import type { EventType } from '~~/types'
import { ModalModeEnum, ModalNameEnum } from '@/types'

interface Props {
  event: EventType
}

const props = defineProps<Props>()

const addressStore = useAddressStore()
const userStore = useUserStore()
const authStore = useAuthStore()
const companyStore = useCompanyStore()
const uiStore = useUiStore()
const { setUiModal } = uiStore

const { $toFormat } = useNuxtApp()
const { isSameDay } = dateHook()
const { syncEvent } = eventHook()

const getDateEventDisplay = computed(() => {
  if (isSameDay(props.event.end, props.event.start)) {
    return $toFormat(props.event.end, 'DD MMMM YYYY')
  }
  return `Du ${$toFormat(props.event.start, 'DD MMMM YYYY')} au ${$toFormat(props.event.end, 'DD MMMM YYYY')}`
})

const eventAddress = computed(() => {
  if (props.event) {
    if (props.event.addressId) {
      return addressStore.getOne(props.event?.addressId as number)
    }
  }
  return null
})

function deleteEvent() {
  setUiModal({
    modalName: ModalNameEnum.EVENT_FORM,
    isActive: true,
    modalMode: ModalModeEnum.DELETE,
    data: {
      event: props.event,
    },
  })
}
</script>
