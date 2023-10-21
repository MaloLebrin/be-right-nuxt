<template>
<BaseDeleteConfirmModal
  :title="getModalTitle"
  :is-active="isActive"
>
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
      Supprimer <span
        v-show="isForEver"
        class="ml-2"
      >définitivement</span>
    </BaseButton>
    <BaseButton @click="close">
      Annuler
    </BaseButton>
  </div>
</BaseDeleteConfirmModal>
</template>

<script setup lang="ts">
import type { UserType } from '@/types'
import { useUiStore } from '~~/store'
import BaseDeleteConfirmModal from '~~/components/Base/BaseDeleteConfirmModal.vue'
import BaseButton from '~~/components/Base/BaseButton.vue'

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
