<template>
<BaseLayout>
  <PageAuthWrapper>
    <div class="pb-10 mx-auto max-w-7xl lg:py-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <AccountMenu />
        <slot />
      </div>
    </div>
  </PageAuthWrapper>

  <template #modals>
    <ClientOnly>
      <AccountCreateUserModal
        v-if="uiStore.isModalActive(ModalNameEnum.CREATE_USER)"
        :is-active="uiStore.isModalActive(ModalNameEnum.CREATE_USER)"
      />
    </ClientOnly>
  </template>
</BaseLayout>
</template>

<script setup lang="ts">
import AccountMenu from '~~/components/Account/Menu.vue'
import BaseLayout from '~/components/Layouts/BaseLayout.vue'
import AccountCreateUserModal from '~~/components/Account/CreateUserModal.vue'
import PageAuthWrapper from '~/components/Page/PageAuthWrapper.vue'
import { ModalNameEnum } from '~~/types'
import { useUiStore } from '~~/store'

const uiStore = useUiStore()
</script>
