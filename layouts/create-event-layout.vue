<template>
<BaseLayout>
  <PageAuthWrapper>
    <EventFormStepperWrapper />

    <div
      v-if="!haveUserEmployees"
      class="flex items-center justify-center my-4"
    >
      <BaseMessage type="warning">
        <div class="flex flex-col items-center">
          <p>Attention vous devez créer des destinataires avant de créer un événement</p>
          <BaseButton
            class="mt-4"
            :href="{ name: RouteNames.EMPLOYEE_CREATE }"
          >
            Créer un destinataire
          </BaseButton>
        </div>
      </BaseMessage>
    </div>

    <slot />
  </PageAuthWrapper>

  <template #modals>
    <ClientOnly>
      <AddEmployeeModal
        v-if="uiStore.isModalActive(ModalNameEnum.ADD_RECIPIENT_TO_EVENT)"
        :is-active="uiStore.isModalActive(ModalNameEnum.ADD_RECIPIENT_TO_EVENT)"
      />

      <PhotographerModal
        v-if="uiStore.getUiModalState.isActive
          && uiStore.getUiModalState.modalName === ModalNameEnum.CREATE_PHOTOGRAPHER"
        :is-active="uiStore.getUiModalState.isActive
          && uiStore.getUiModalState.modalName === ModalNameEnum.CREATE_PHOTOGRAPHER"
        @close="resetUiModalState"
      />
    </ClientOnly>
  </template>
</BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '~/components/Layouts/BaseLayout.vue'
import AddEmployeeModal from '~~/components/Event/Form/AddEmployeeModal.vue'
import BaseButton from '~/components/Base/BaseButton.vue'
import BaseMessage from '~/components/Base/BaseMessage.vue'
import PageAuthWrapper from '~/components/Page/PageAuthWrapper.vue'
import PhotographerModal from '~/components/Photographer/PhotographerModal.vue'
import { RouteNames } from '~~/helpers/routes'
import {
  ModalNameEnum,
  useAuthStore,
  useCompanyStore,
  useEmployeeStore,
  useGroupStore,
  useUiStore,
  useUserStore,
} from '~~/store'

const employeeStore = useEmployeeStore()
const authStore = useAuthStore()
const userStore = useUserStore()
const companyStore = useCompanyStore()
const groupStore = useGroupStore()
const uiStore = useUiStore()
const { resetUiModalState, IncLoading, DecLoading } = uiStore

const { getPhotographerUserWorkedWith } = userHook()
const { fetchMany: fetchManyEmployees } = employeeHook()
const { fetchMany: fetchManyGroups } = groupHook()
const { fetchCustomer } = stripeCustomerHook()
const { fetchOne } = companyHook()

const haveUserEmployees = computed(() => {
  if (!authStore.isAuthUserAdmin) {
    return employeeStore.getAllArray.length > 0
  }
  return true
})

onMounted(async () => {
  IncLoading()
  if (!authStore.isAuthUserAdmin) {
    if (!userStore.getAuthUserCustomerId) {
      await fetchCustomer()
    }
    if (!companyStore.getAuthCompany && userStore.getAuthUserCompanyId) {
      await fetchOne(userStore.getAuthUserCompanyId)
    }

    if (companyStore.getAuthCompany
      && companyStore.getAuthCompany.employeeIds.length > 0) {
      const missingsEmployeeIds = companyStore.getAuthCompany.employeeIds.filter(id => !employeeStore.isAlreadyInStore(id))

      if (missingsEmployeeIds?.length > 0) {
        await fetchManyEmployees(missingsEmployeeIds)
      }
      await getPhotographerUserWorkedWith()

      const missingGroupIds = companyStore.getAuthCompany.groupIds.filter(id => !groupStore.isAlreadyInStore(id))
      if (missingGroupIds.length > 0) {
        await fetchManyGroups(missingGroupIds)
      }
    }
  }
  DecLoading()
})
</script>
