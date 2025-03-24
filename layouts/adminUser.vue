<template>
<BaseLayout>
  <AdminUserMenu />
  <section class="px-4 my-2">
    <slot />
  </section>

  <template #modals>
    <ClientOnly>
      <DeleteUserModal
        v-if="isModalActive(ModalNameEnum.USER_ADMIN).value"
        :is-active="isModalActive(ModalNameEnum.USER_ADMIN).value"
        :user="uiStore.getUiModalState.data?.user"
        :is-for-ever="uiStore.getUiModalState.data?.forEver"
        @close="CloseResetModalState"
      />

      <EmployeeModal
        v-if="isEmployeeModaleActive"
        :is-active="isModalActive(ModalNameEnum.DELETE_EMPLOYEE_FOR_EVER).value || isModalActive(ModalNameEnum.DELETE_EMPLOYEE).value"
        :mode="uiStore.getUiModalState.modalMode"
        :event-id="eventID!"
        :employee="uiStore.getUiModalState.data?.employee"
        :is-for-ever="uiStore.getUiModalState.data?.forEver"
        @close="CloseResetModalState"
      />
    </ClientOnly>
  </template>
</BaseLayout>
</template>

<script setup lang="ts">
import DeleteUserModal from '~/components/User/DeleteUserModal.vue'
import BaseLayout from '~/components/Layouts/BaseLayout.vue'
import {
  ModalNameEnum,
  useEventStore,
  useUiStore,
} from '~/store'
import EmployeeModal from '~/components/Employee/EmployeeModal.vue'
import AdminUserMenu from '~~/components/User/AdminUserMenu.vue'

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
  return null
})

const isEmployeeModaleActive = computed(() =>
  (isModalActive(ModalNameEnum.DELETE_EMPLOYEE_FOR_EVER).value
    || isModalActive(ModalNameEnum.DELETE_EMPLOYEE).value) && eventID.value
)

function CloseResetModalState() {
  resetUiModalState()
}
</script>
