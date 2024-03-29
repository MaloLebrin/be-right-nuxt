<template>
<Form
  v-slot="{ meta, isSubmitting }"
  :validation-schema="schema"
  :initial-values="initialValues"
  class="grid max-w-3xl grid-cols-1 gap-4 mt-4 mb-36"
  @submit="submit"
>
  <EmployeeComboboxSelector
    name="employees"
    :default-values="defaultValues"
    value-key="id"
    wrapper-classes="md:col-span-2"
    is-required
    hide-liste
    @change="setEmployeeIds"
  />
  <div class="flex items-center justify-center mt-6 md:col-span-3">
    <BaseButton
      :disabled="!meta.valid"
      :is-loading="uiStore.getUIIsLoading || isSubmitting"
      type="submit"
    >
      <template #icon>
        <ArrowDownOnSquareIcon />
      </template>
      Enregistrer
    </BaseButton>
  </div>
</Form>
</template>

<script setup lang="ts">
import { array, number, object } from 'yup'
import { Form } from 'vee-validate'
import { ArrowDownOnSquareIcon } from '@heroicons/vue/24/outline'
import EmployeeComboboxSelector from '~/components/Employee/EmployeeComboboxSelector.vue'
import BaseButton from '~/components/Base/BaseButton.vue'
import {
  useAuthStore,
  useEmployeeStore,
  useFormStore,
  useUiStore,
  useUserStore,
} from '~~/store'

const emit = defineEmits(['submitEmployees'])

const employeeStore = useEmployeeStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading, resetUiModalState } = uiStore
const authStore = useAuthStore()
const userStore = useUserStore()
const formStore = useFormStore()
const { setEmployeeIds } = formStore

const schema = object({
  employees: array().of(number()).min(1, 'Sélectionnez au moins un destinataire')
    .required('Les destinataires sont obligatoire'),
})

const initialValues = {
  employees: formStore.getEmployeeIds || [],
}

const defaultValues = computed(() => {
  if (authStore.isAuthUserAdmin) {
    return employeeStore.getAllArray
  }
  if (userStore.getAuthUser?.companyId) {
    return employeeStore.getEmployeesByUserId(userStore.getAuthUser.companyId)
  }
  return []
})

async function submit() {
  IncLoading()
  emit('submitEmployees')
  DecLoading()
  resetUiModalState()
}
</script>
