<template>
<BaseLayout>
  <div class="relative flex min-h-screen bg-white dark:bg-blue-dark">
    <div class="w-full">
      <slot />
    </div>
  </div>

  <template #modals>
    <ClientOnly>
      <EventModal
        v-if="isModalActive(ModalNameEnum.EVENT_FORM).value"
        :is-active="isModalActive(ModalNameEnum.EVENT_FORM).value"
      />

      <EmployeeModal
        v-if="isModalActive(ModalNameEnum.DELETE_EMPLOYEE).value && eventID"
        :is-active="isModalActive(ModalNameEnum.DELETE_EMPLOYEE).value"
        :mode="uiStore.getUiModalState.modalMode"
        :event-id="Number(eventID)"
        @close="CloseResetModalState"
      />
      <EmployeeModal
        v-if="isModalActive(ModalNameEnum.DELETE_EMPLOYEE_FOR_EVER).value && eventID"
        :is-active="isModalActive(ModalNameEnum.DELETE_EMPLOYEE_FOR_EVER).value"
        :mode="uiStore.getUiModalState.modalMode"
        :event-id="Number(eventID)"
        :is-for-ever="isModalActive(ModalNameEnum.DELETE_EMPLOYEE_FOR_EVER).value"
        @close="CloseResetModalState"
      />

      <AddEmployeeToEventModal
        v-if="isModalActive(ModalNameEnum.ADD_EMPLOYEE).value && eventID"
        :is-active="isModalActive(ModalNameEnum.ADD_EMPLOYEE).value"
        :event-id="Number(eventID)"
      />

      <AddRecipientModal
        v-if="isModalActive(ModalNameEnum.ADD_RECIPIENT_TO_GROUP).value"
        :is-active="isModalActive(ModalNameEnum.ADD_RECIPIENT_TO_GROUP).value"
        :group-id="uiStore.getUiModalState.data?.groupId"
      />

      <DeleteConfirmModal
        v-if="isModalActive(ModalNameEnum.DELETE_CONFIRM_GROUP).value"
        :is-active="isModalActive(ModalNameEnum.DELETE_CONFIRM_GROUP).value"
        :group-id="uiStore.getUiModalState.data?.groupId"
      />

      <UserMissingInfoModal />
    </ClientOnly>
  </template>
</BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '~/components/Layouts/BaseLayout.vue'
import AddEmployeeToEventModal from '~/components/Employee/AddEmployeeToEventModal.vue'
import AddRecipientModal from '~/components/Group/AddRecipientModal.vue'
import DeleteConfirmModal from '~/components/Group/DeleteConfirmModal.vue'
import EmployeeModal from '~/components/Employee/EmployeeModal.vue'
import EventModal from '~/components/Event/EventModal.vue'
import UserMissingInfoModal from '~~/components/User/MissingInfoModal.vue'
import { useAuthStore, useEventStore, useUiStore } from '~~/store'
import { ModalNameEnum } from '~~/types'

const uiStore = useUiStore()
const authStore = useAuthStore()
const { resetUiModalState } = uiStore
const eventStore = useEventStore()
const { logWithToken } = authHook()

const isModalActive = (modalName: ModalNameEnum) => computed(() =>
  uiStore.getUiModalState.isActive
  && uiStore.getUiModalState.modalName === modalName
  && !uiStore.getUiModalState.isLoading)

const eventID = computed(() => {
  if (uiStore.getUiModalState.data && uiStore.getUiModalState.data.eventId) {
    return eventStore.entities.byId[uiStore.getUiModalState.data.eventId].id
  }
  return null
})

function CloseResetModalState() {
  resetUiModalState()
}

onMounted(async () => {
  if (authStore.getToken) {
    await logWithToken(authStore.getToken)
  }
  const { startSEE } = notificationSSEHook()
  startSEE()
})
</script>
