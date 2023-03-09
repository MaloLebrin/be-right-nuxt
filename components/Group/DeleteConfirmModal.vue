<template>
<BaseModal
  :is-active="isActive"
  @close="close"
>
  <div class="px-4 py-2 sm:flex sm:items-start">
    <div
      v-if="uiStore.getUiModalState.modalMode === ModalModeEnum.DELETE"
      class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10"
    >
      <ExclamationTriangleIconOutline
        class="w-6 h-6 text-red-600"
        aria-hidden="true"
      />
    </div>
    <div class="mt-3 space-y-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <DialogTitle
        as="h3"
        class="text-lg font-medium leading-6 text-gray-900"
      >
        {{ getModalTitle }}
      </DialogTitle>
      <div
        v-if="uiStore.getUiModalState.modalMode === ModalModeEnum.DELETE"
        class="mt-2 space-y-4"
      >
        <p class="text-sm text-gray-500">
          Êtes-vous sûr de vouloir supprimer cette liste ?
        </p>
        <div class="mt-5 sm:space-x-8 sm:mt-4 sm:flex sm:items-center sm:justify-center">
          <BaseButton
            color="red"
            :is-loading="uiStore.getUIIsLoading"
            @click="deletegroupe"
          >
            Supprimer
          </BaseButton>
          <BaseButton @click="close">
            Annuler
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</BaseModal>
</template>

<script setup lang="ts">
import { ModalModeEnum } from '@/types'
import { useGroupStore, useUiStore } from '~~/store'

interface Props {
  isActive: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: false,
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
}>()

const groupStore = useGroupStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading, resetUiModalState } = uiStore

const { deleteGroup } = groupHook()

async function deletegroupe() {
  if (uiStore.getUiModalState && uiStore.getUiModalData?.groupId) {
    IncLoading()
    await deleteGroup(uiStore.getUiModalData?.groupId)
    DecLoading()
    close()
  }
}

function close() {
  resetUiModalState()
  emit('close')
}

const getModalTitle = computed(() => uiStore.getUiModalData?.groupId && groupStore.getOne(uiStore.getUiModalData.groupId)
  ? `Supprimer la liste de diffusion: ${groupStore.getOne(uiStore.getUiModalData.groupId).name}`
  : 'Supprimer une liste de diffusion')
</script>
