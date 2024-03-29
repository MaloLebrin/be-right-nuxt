<template>
<TransitionRoot
  appear
  :show="isOpen"
  as="template"
>
  <Dialog
    as="div"
    class="fixed inset-0 z-10 overflow-y-auto"
    @close="closeModal"
  >
    <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 z-0 transition-opacity bg-gray-600 bg-opacity-75" />
      </TransitionChild>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >&#8203;</span>
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leave-from="opacity-100 translate-y-0 sm:scale-100"
        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          class="relative inline-block px-4 pt-5 pb-4 overflow-visible text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        >
          <button
            class="absolute z-20 bg-white border-none rounded-full -top-2 -right-2"
            @click="closeModal"
          >
            <XCircleIcon class="text-gray-900 w-7 h-7" />
          </button>
          <slot />
        </div>
      </TransitionChild>
    </div>
  </Dialog>
</TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogOverlay, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XCircleIcon } from '@heroicons/vue/24/outline'

interface ModalProps {
  isActive: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  isActive: true,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isOpen = ref(props.isActive)

function closeModal() {
  isOpen.value = false
  emit('close')
}
</script>
