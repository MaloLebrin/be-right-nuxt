<template>
<div class="space-y-6">
  <!-- Liste des destinataires -->
  <div
    v-if="employees.length > 0"
    class="space-y-4">
    <h3 class="text-lg font-medium">Destinataires ajoutés</h3>
    <ul class="space-y-2">
      <li
        v-for="(employee, index) in employees"
        :key="index"
        class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
      >
        <div>
          <p class="font-medium">{{ employee.firstName }} {{ employee.lastName }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ employee.email }}</p>
        </div>
        <button
          type="button"
          class="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          @click="removeEmployee(index)"
        >
          Supprimer
        </button>
      </li>
    </ul>
  </div>

  <!-- Formulaire d'ajout -->
  <div class="space-y-4">
    <h3 class="text-lg font-medium">Ajouter un destinataire</h3>
    <EmployeeForm
      :company-id="companyId"
      @submit="handleSubmit"
    />
  </div>

  <!-- Boutons d'action -->
  <div class="flex justify-between">
    <BaseButton
      type="button"
      variant="default"
      :disabled="employees.length === 0"
      @click="$emit('previous')"
    >
      Précédent
    </BaseButton>
    <BaseButton
      type="button"
      :disabled="employees.length === 0"
      @click="handleComplete"
    >
      Valider et continuer
    </BaseButton>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EmployeeForm from './EmployeeForm.vue'
import BaseButton from '~/components/Base/BaseButton.vue'
import type { Employee } from '~/types'

const props = defineProps<{
  companyId: number | null
}>()

const emit = defineEmits<{
  (e: 'complete', employees: Employee[]): void
  (e: 'previous'): void
}>()

const employees = ref<Employee[]>([])

function handleSubmit(employee: Employee) {
  employees.value.push(employee)
}

function removeEmployee(index: number) {
  employees.value.splice(index, 1)
}

function handleComplete() {
  emit('complete', employees.value)
}
</script> 
