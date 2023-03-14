<template>
<!-- Global notification live region, render this permanently at the end of the document -->
<div
  aria-live="assertive"
  class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:items-start sm:p-6"
>
  <div class="flex flex-col items-center w-full space-y-4 sm:items-end">
    <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
    <transition
      enter-active-class="transition duration-300 ease-out transform"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="w-full max-w-sm overflow-hidden rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5"
        :class="colorClasses"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <InformationCircleIconOutline
                v-if="type === 'info'"
                class="w-6 h-6 text-blue-800"
              />
              <XCircleIconOutline
                v-if="type === 'danger'"
                class="w-6 h-6 text-red-800"
              />
              <CheckCircleIconOutline
                v-if="type === 'success'"
                class="w-6 h-6 text-green-800"
              />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">
                {{ title }}
              </p>
              <p class="mt-1 text-sm text-gray-500">
                {{ description }}
              </p>
            </div>
            <div class="flex flex-shrink-0 ml-4">
              <button
                type="button"
                class="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="close"
              >
                <span class="sr-only">Close</span>
                <XMarkIcon
                  class="w-5 h-5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/20/solid'

interface Props {
  isActive: boolean
  type: 'danger' | 'info' | 'success' | 'test'
  title: string
  description: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Successfully saved!',
  description: 'Anyone with a link can now view this file.',
  type: 'info',
})

const emit = defineEmits<{
  (e: 'close-toast'): void
}>()

const show = ref(props.isActive)

function close() {
  show.value = false
  // eslint-disable-next-line vue/custom-event-name-casing
  emit('close-toast')
}

const colorClasses = () => {
  switch (props.type) {
    case 'danger':
      return 'border-red-800 bg-red-100 text-red-800'

    case 'success':
      return 'border-green-800 bg-green-100 text-green-800'

    default:
      return 'border-blue-800 bg-blue-100 text-blue-800'
  }
}
</script>
