<template>
<form
  action="/api/stripe/payments/payment"
  method="POST"
>
  <input
    type="hidden"
    name="nbRecipients"
    :value="nbRecipients"
  >
  <input
    type="hidden"
    name="stripeCustomerId"
    :value="stripeCustomerId"
  >
  <button
    type="submit"
    :disabled="isDisabled"
    class="w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
    :class="[
      isDisabled ? '' : 'disabled:cursor-not-allowed disabled:opacity-50',
    ]"
  >
    <div
      v-if="isLoading"
      class="flex items-center justify-center w-full h-full"
    >
      <svg
        class="w-6 h-6 text-white-600 animate-spin"
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
    <span v-else>Payer</span>
  </button>
</form>
</template>

<script setup lang="ts">
interface Props {
  isLoading: boolean
  isDisabled: boolean
  stripeCustomerId: string
  nbRecipients: number
}

defineProps<Props>()
</script>
