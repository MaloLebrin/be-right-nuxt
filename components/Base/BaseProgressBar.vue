<template>
<div class="w-full">
  <!-- Étapes numérotées -->
  <div class="flex justify-between mb-4">
    <div
      v-for="step in totalSteps"
      :key="step"
      class="flex flex-col items-center"
    >
      <div
        class="flex items-center justify-center w-8 h-8 mb-2 transition-colors duration-300 rounded-full"
        :class="{
          'bg-indigo-600 text-white': step <= currentStep,
          'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400': step > currentStep,
        }"
      >
        {{ step }}
      </div>
      <span
        class="text-sm transition-colors duration-300"
        :class="{
          'text-indigo-600 font-medium': step <= currentStep,
          'text-gray-500 dark:text-gray-400': step > currentStep,
        }"
      >
        {{ getStepLabel(step) }}
      </span>
    </div>
  </div>

  <!-- Barre de progression -->
  <div class="relative h-2 bg-gray-200 rounded-full dark:bg-gray-700">
    <div
      class="absolute top-0 left-0 h-full transition-all duration-500 ease-in-out bg-indigo-600 rounded-full"
      :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
    />
  </div>
</div>
</template>

<script setup lang="ts">
interface Props {
  currentStep: number
  totalSteps: number
}

defineProps<Props>()

function getStepLabel(step: number): string {
  switch (step) {
    case 1:
      return 'Informations'
    case 2:
      return 'Entreprise'
    case 3:
      return 'Configuration'
    default:
      return `Étape ${step}`
  }
}
</script> 
