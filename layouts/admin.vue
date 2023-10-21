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
    />
  </ClientOnly>
</main>
</template>

<script setup lang="ts">
import MenuDrawer from '~/components/Menu/MenuDrawer.vue'
import HeaderDashboard from '~/components/Header/HeaderDashboard.vue'
import DeleteUserModal from '~/components/User/DeleteUserModal.vue'
import { ModalNameEnum, useUiStore } from '~/store'

const uiStore = useUiStore()

const isModalActive = (modalName: ModalNameEnum) => computed(() =>
  uiStore.getUiModalState.isActive
  && uiStore.getUiModalState.modalName === modalName
  && !uiStore.getUiModalState.isLoading)
</script>
