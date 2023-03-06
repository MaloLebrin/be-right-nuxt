<template>
<BaseModal
  :is-active="isActive"
  @close="close"
>
  <div class="px-4 py-2 sm:flex sm:items-start">
    <div
      class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-blue-100 rounded-full sm:mx-0 sm:h-10 sm:w-10"
    >
      <ExclamationTriangleIconOutline
        class="w-6 h-6 text-blue-600"
        aria-hidden="true"
      />
    </div>
    <div class="mt-3 space-y-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <DialogTitle
        as="h3"
        class="text-lg font-medium leading-6 text-gray-900"
      >
        Créer une liste de diffusion
      </DialogTitle>
    </div>
  </div>
</BaseModal>
</template>

<script setup lang="ts">
import { useUiStore } from '~~/store'

interface Props {
  isActive: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false,
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
}>()

const uiStore = useUiStore()
const { IncLoading, DecLoading, resetUiModalState } = uiStore

function close() {
  resetUiModalState()
  emit('close')
}
</script>
