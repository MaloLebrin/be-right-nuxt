<template>
<main class="flex min-h-screen bg-white dark:bg-blue-dark">
  <MenuDrawer />
  <div class="w-full lg:ml-64">
    <HeaderDashboard />
    <slot />
  </div>

  <ClientOnly>
    <DeleteUserModal
      v-if="isModalActive(ModalNameEnum.USER_ADMIN).value"
      :is-active="isModalActive(ModalNameEnum.USER_ADMIN).value"
      :user="uiStore.getUiModalState.data?.user"
      :is-for-ever="uiStore.getUiModalState.data?.forEver"
      @close="CloseResetModalState"
    />

    <EmployeeModal
      v-if="isModalActive(ModalNameEnum.DELETE_EMPLOYEE_FOR_EVER).value || isModalActive(ModalNameEnum.DELETE_EMPLOYEE).value"
      :is-active="isModalActive(ModalNameEnum.DELETE_EMPLOYEE_FOR_EVER).value || isModalActive(ModalNameEnum.DELETE_EMPLOYEE).value"
      :mode="uiStore.getUiModalState.modalMode"
      :event-id="eventID"
      :employee="uiStore.getUiModalState.data?.employee"
      :is-for-ever="uiStore.getUiModalState.data?.forEver"
      @close="CloseResetModalState"
    />
  </ClientOnly>
</main>
</template>

<script setup lang="ts">
import MenuDrawer from '~/components/Menu/MenuDrawer.vue'
import HeaderDashboard from '~/components/Header/HeaderDashboard.vue'
import DeleteUserModal from '~/components/User/DeleteUserModal.vue'
import { ModalNameEnum, useEventStore, useUiStore } from '~/store'
import EmployeeModal from '~/components/Employee/EmployeeModal.vue'

const eventStore = useEventStore()
const uiStore = useUiStore()
const { resetUiModalState } = uiStore

const isModalActive = (modalName: ModalNameEnum) => computed(() =>
  uiStore.getUiModalState.isActive
  && uiStore.getUiModalState.modalName === modalName
  && !uiStore.getUiModalState.isLoading)

const eventID = computed(() => {
  if (uiStore.getUiModalState.data && uiStore.getUiModalState.data.eventId) {
    return eventStore.entities.byId[uiStore.getUiModalState.data.eventId].id
  }
})

function CloseResetModalState() {
  resetUiModalState()
}
</script>
