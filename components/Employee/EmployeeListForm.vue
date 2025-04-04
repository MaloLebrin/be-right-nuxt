<template>
<div class="space-y-6">
  <!-- Liste des employés -->
  <div
    v-if="employees.length > 0"
    class="space-y-4">
    <h3 class="text-lg font-medium">Destinataires ajoutés</h3>
    <div class="space-y-2">
      <div
        v-for="employee in employees"
        :key="employee.id"
        class="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <div>
          <p class="font-medium text-indigo-600">{{ employee.firstName }} {{ employee.lastName }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ employee.email }}</p>
        </div>
        <BaseButton
          type="button"
          variant="default"
          @click="removeEmployee(employee)">
          Supprimer
        </BaseButton>
      </div>
    </div>
  </div>

  <!-- Formulaire d'ajout -->
  <Form
    v-slot="{ meta, isSubmitting, errors, setFieldValue, values }"
    :validation-schema="schema"
    :initial-values="formInitialValues"
    class="space-y-4"
    @submit="handleSubmit as any"
  >
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <BaseInput
        label="Prénom"
        name="firstName"
        type="text"
        autocomplete="given-name"
        is-required
      />
      <BaseInput
        label="Nom"
        name="lastName"
        type="text"
        autocomplete="family-name"
        is-required
      />
    </div>

    <div>
      <BaseInput
        label="Adresse email"
        name="email"
        type="email"
        is-required />
      <BaseEmailSuggestions
        :first-name="values.firstName"
        :last-name="values.lastName"
        :email="values.email"
        @select="setFieldValue('email', $event)" />
    </div>


    <BaseInput
      label="Téléphone"
      name="phone"
      type="tel"
      is-required />

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <BaseInput
        label="Adresse"
        name="addressLine"
        type="text"
        is-required />
      <BaseInput
        label="Complément d'adresse"
        name="addressLine2"
        type="text"
      />
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <BaseInput
        label="Code postal"
        name="postalCode"
        type="text"
        is-required />
      <BaseInput
        label="Ville"
        name="city"
        type="text"
        is-required />
      <BaseInput
        label="Pays"
        name="country"
        type="text"
        autocomplete="country"
        is-required />
    </div>

    <div class="flex justify-end">
      <BaseButton
        type="submit"
        :disabled="!meta.valid || isSubmitting"
        :is-loading="isSubmitting">
        Ajouter
      </BaseButton>
    </div>

    <BaseFormDebug
      :meta="meta"
      :is-submitting="isSubmitting"
      :errors="errors" />

    <div class="flex justify-between md:col-span-2">
      <BaseButton
        type="button"
        variant="default"
        :disabled="isSubmitting"
        @click="previousStep">
        Précédent
      </BaseButton>
      <div class="flex space-x-4">
        <BaseButton
          type="button"
          variant="default"
          :disabled="isSubmitting"
          @click="handleStep3Submit">
          Passer cette étape
        </BaseButton>
        <BaseButton
          :disabled="isSubmitting || uiStore.getUIIsLoading"
          :is-loading="isSubmitting"
          @click="handleStep3Submit">
          S'inscrire
        </BaseButton>
      </div>
    </div>
  </Form>
</div>
</template>

<script setup lang="ts">
import { object, string } from 'yup'
import type { SubmissionHandler } from 'vee-validate';
import { Form } from 'vee-validate'
import type { EmployeeType } from '~/types'
import BaseButton from '~/components/Base/BaseButton.vue'
import BaseInput from '~/components/Base/BaseInput.vue'
import BaseFormDebug from '~/components/Base/BaseFormDebug.vue'
import { useUiStore } from '~~/store'
import type { Step3Employee } from '~/composables/useRegister'

const uiStore = useUiStore()

const emit = defineEmits<{
  (e: 'previous'): void
  (e: 'complete', employees: Partial<EmployeeType>[]): void
}>()

const employees = ref<Partial<EmployeeType>[]>([])

const {
  previousStep,
  handleStep3Submit,
  setStep3Dirty,
  addStep3Employee,
  removeStep3Employee,
} = useRegister()

interface FormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  addressLine: string
  addressLine2: string | null
  postalCode: string
  city: string
  country: string
}

const formInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  addressLine: '',
  addressLine2: null,
  postalCode: '',
  city: '',
  country: 'France',
}

const schema = object<FormValues>({
  firstName: string().required('Le prénom est requis'),
  lastName: string().required('Le nom est requis'),
  email: string().email('vous devez entrer un email valide').required('L\'adresse email est requise'),
  phone: string().required('Le téléphone est requis'),
  addressLine: string().required('L\'adresse est requise'),
  addressLine2: string().nullable(),
  postalCode: string().required('Le code postal est requis'),
  city: string().required('La ville est requise'),
  country: string().required('Le pays est requis'),
})

function handleSubmit(values: FormValues) {
  setStep3Dirty()

  const newEmployee = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phone: values.phone,
    addressLine: values.addressLine,
    addressLine2: values.addressLine2,
    postalCode: values.postalCode,
    city: values.city,
    country: values.country,
    bornAt: new Date(),
  }
  employees.value.push(newEmployee)
  addStep3Employee(newEmployee)

  emit('complete', employees.value)
}

/**
 * Supprime un employé de la liste des employés
 * @param {EmployeeType} employee - L'employé à supprimer
 */
function removeEmployee(employee: Partial<EmployeeType>) {
  removeStep3Employee(employee as unknown as Step3Employee)
  employees.value = employees.value.filter(e => e.email !== employee.email)
}
</script>
