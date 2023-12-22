<template>
<BaseDeleteConfirmModal
  :title="getModalTitle"
  :is-active="isActive"
>
  <template v-if="isForEver">
    <BaseMessage
      v-if="user"
      type="danger"
    >
      <p>
        Pour confirmer l'action écrivez
        <span class="p-1 text-gray-100 bg-red-500 rounded-md">{{ `${user.firstName}-${user.lastName}` }}</span>
      </p>
    </BaseMessage>
    <Form
      v-slot="{ meta, isSubmitting }"
      :validation-schema="schema"
      :initial-values="{ confirmText: '' }"
      @submit="submit"
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
            <TrashIcon />
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
      Êtes-vous sûr de vouloir supprimer cet utilisateur ? Toutes ses données
      seront définitivement supprimés de nos serveurs pour toujours. Cette action ne peut pas être annulée.
    </p>
    <div class="mt-5 sm:space-x-8 sm:mt-4 sm:flex sm:items-center sm:justify-center">
      <BaseButton
        color="red"
        :is-loading="uiStore.getUIIsLoading"
        @click="submit"
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
import { TrashIcon } from '@heroicons/vue/24/outline'
import { Form } from 'vee-validate'
import { object, string } from 'yup'
import type { UserType } from '~~/types'
import { useUiStore } from '~~/store'
import BaseDeleteConfirmModal from '~~/components/Base/BaseDeleteConfirmModal.vue'
import BaseButton from '~~/components/Base/BaseButton.vue'
import BaseInput from '~~/components/Base/BaseInput.vue'
import BaseMessage from '~~/components/Base/BaseMessage.vue'

interface Props {
  isActive: boolean
  user?: UserType
  isForEver?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
  user: undefined,
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
}>()

const uiStore = useUiStore()
const { IncLoading, DecLoading, resetUiModalState } = uiStore
const { getUserfullName, deleteForEver, deleteUser } = userHook()

function close() {
  resetUiModalState()
  emit('close')
}

const schema = object({
  confirmText: string()
    .oneOf([`${props.user?.firstName}-${props.user?.lastName}`], 'Le text n\'est pas conforme')
    .required('Vous devez confirmer la suppression'),
})

async function submit() {
  IncLoading()
  if (props.user) {
    if (props.isForEver) {
      await deleteForEver(props.user.id)
    } else {
      await deleteUser(props.user.id)
    }
  }
  close()
  DecLoading()
}

const getModalTitle = computed(() => {
  if (props.isForEver) {
    return props.user
      ? `Supprimer définitivement l'utilisateur ${getUserfullName(props.user)}`
      : 'Supprimer définitivement un utilisateur'
  }
  return props.user
    ? `Supprimer l'utilisateur ${getUserfullName(props.user)}`
    : 'Supprimer un utilisateur' })
</script>
