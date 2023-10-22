<template>
<BaseDeleteConfirmModal
  :title="getModalTitle"
  :is-active="isActive"
>
  <template v-if="isForEver">
    <BaseMessage
      v-if="employee"
      type="danger"
    >
      <p>
        Pour confirmer l'action écrivez
        <span class="p-1 text-gray-100 bg-red-500 rounded-md">{{ `${employee.firstName}-${employee.lastName}` }}</span>
      </p>
    </BaseMessage>
    <Form
      v-slot="{ meta, isSubmitting }"
      :validation-schema="schema"
      :initial-values="{ confirmText: '' }"
      @submit="deleteEmployee"
    >
      <BaseInput
        label="Text de confirmation"
        name="confirmText"
        type="text"
        is-required
      />
      <div class="flex items-center justify-center mt-6 space-x-2 md:col-span-2">
        <BaseButton
          color="red"
          :disabled="!meta.valid || !meta.dirty || isSubmitting"
          :is-loading="uiStore.getUIIsLoading || isSubmitting"
          type="submit"
        >
          <template #icon>
            <TrashIconOutline />
          </template>
          Supprimer définitivement
        </BaseButton>
        <BaseButton @click="close">
          Annuler
        </BaseButton>
      </div>
    </Form>
  </template>
  <template v-else>
    <p class="text-sm text-gray-500">
      Êtes-vous sûr de vouloir supprimer ce destinataire ? Toutes ses données
      seront définitivement supprimés de nos serveurs pour toujours. Cette action ne peut pas être annulée.
    </p>
    <div class="mt-5 sm:space-x-8 sm:mt-4 sm:flex sm:items-center sm:justify-center">
      <BaseButton
        color="red"
        :is-loading="uiStore.getUIIsLoading"
        @click="deleteEmployee"
      >
        Supprimer
      </BaseButton>
      <BaseButton @click="close">
        Annuler
      </BaseButton>
    </div>
  </template>
</BaseDeleteConfirmModal>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { object, string } from 'yup'
import type { EmployeeType, ModalModeEnum } from '@/types'
import { useUiStore } from '~~/store'
import BaseDeleteConfirmModal from '~~/components/Base/BaseDeleteConfirmModal.vue'
import BaseButton from '~~/components/Base/BaseButton.vue'
import BaseInput from '~~/components/Base/BaseInput.vue'
import BaseMessage from '~~/components/Base/BaseMessage.vue'

interface Props {
  mode?: ModalModeEnum
  isActive: boolean
  employee?: EmployeeType
  eventId?: number
  userId?: number
  isForEver?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  employee: undefined,
  mode: undefined,
  eventId: undefined,
  userId: undefined,
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
}>()

const schema = object({
  confirmText: string()
    .oneOf([`${props.employee?.firstName}-${props.employee?.lastName}`], 'Le text n\'est pas conforme')
    .required('Vous devez confirmer la suppression'),
})

const uiStore = useUiStore()
const { IncLoading, DecLoading, resetUiModalState } = uiStore
const { deleteOne, deleteOneForEver, getEmployeeFullname } = employeeHook()

async function deleteEmployee() {
  if (uiStore.getUiModalState && uiStore.getUiModalData?.employee) {
    IncLoading()
    const id = uiStore.getUiModalData.employee.id
    if (id) {
      if (props.isForEver) {
        await deleteOneForEver(id)
      } else {
        await deleteOne(id)
      }
    }
    DecLoading()
    close()
  }
}

function close() {
  resetUiModalState()
  emit('close')
}

const getModalTitle = computed(() => props.employee
  ? `Supprimer un destinataire ${getEmployeeFullname(props.employee)}`
  : 'Supprimer un destinataire')
</script>
