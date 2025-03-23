<template>
<Transition
  enter-active-class="transition duration-300 ease-out"
  enter-from-class="transform translate-y-full opacity-0"
  enter-to-class="transform translate-y-0 opacity-100"
  leave-active-class="transition duration-300 ease-in"
  leave-from-class="transform translate-y-0 opacity-100"
  leave-to-class="transform translate-y-full opacity-0"
>
  <div
    v-if="isLoading"
    :class="[
      '',
      additionalClass,
    ]"
  >
    <div class="flex items-center px-4 py-2 space-x-3 bg-indigo-900 rounded-full shadow-lg">
      <div class="w-4 h-4">
        <svg
          class="text-white animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      <span class="text-sm font-medium text-white truncate">{{ message }}</span>
    </div>
  </div>
</Transition>
</template>

<script setup lang="ts">
interface Props {
  isLoading: boolean
  message?: string
  additionalClass?: string
}

withDefaults(defineProps<Props>(), {
  message: 'Chargement en cours...',
  additionalClass: '',
})
</script> 
