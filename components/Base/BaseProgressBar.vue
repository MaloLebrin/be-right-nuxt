<template>
<div class="w-full">
  <div class="flex justify-between mb-2">
    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
      Étape {{ currentStep }} sur {{ totalSteps }}
    </span>
  </div>
  <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    <div
      class="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
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
</script> 
