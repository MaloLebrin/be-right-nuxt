<template>
<div class="container grid grid-cols-1 gap-12 py-6 mx-auto my-6">
  <div class="flex flex-col w-full max-w-2xl mx-auto space-y-12 md:max-w-1/2">
    <div class="mt-4 md:mt-0">
      <h1 class="text-3xl font-bold leading-tight text-center text-gray-800 md:text-5xl dark:text-white">
        Inscription
      </h1>
    </div>

    <!-- Progress bar -->
    <BaseProgressBar
      :current-step="currentStep"
      :total-steps="totalSteps"
    />

    <!-- Forms container with transition -->
    <TransitionGroup
      name="slide"
      tag="div"
      class="relative"
    >
      <!-- Step 1: Basic Information -->
      <Form
        v-if="currentStep === 1"
        v-slot="{ meta, isSubmitting }"
        :validation-schema="stepSchemas[1]"
        :initial-values="step1Values"
        class="w-full px-4 space-y-4 text-left md:space-y-0 md:px-0 md:grid md:gap-6 md:grid-cols-2"
        @submit="handleStep1Submit"
      >
        <BaseRadio
          :id="RoleEnum.PHOTOGRAPHER"
          :value="RoleEnum.PHOTOGRAPHER"
          name="roles"
          :label="'Je suis un photographe'"
        />
        <BaseRadio
          :id="RoleEnum.OWNER"
          :value="RoleEnum.OWNER"
          name="roles"
          :label="'Je suis une entreprise ou un particulier'"
        />

        <div class="space-y-4 md:col-span-2">
          <BaseInput
            label="Nom de l'entreprise"
            name="companyName"
            type="text"
            autocomplete="companyName"
            is-required
          />
        </div>

        <div class="space-y-4">
          <BaseInput
            label="Prénom"
            name="firstName"
            type="text"
            autocomplete="given-name"
            is-required
          />
        </div>

        <div class="space-y-4">
          <BaseInput
            label="Nom"
            name="lastName"
            type="text"
            autocomplete="family-name"
            is-required
          />
        </div>

        <div class="col-span-2 space-y-4">
          <BaseInput
            class="md:col-span-2"
            label="Adresse email"
            name="email"
            type="email"
            autocomplete="email"
            is-required
          />
          <BaseInput
            label="Mot de passe"
            name="password"
            type="password"
            autocomplete="new-password"
            is-required
          />
        </div>

        <div class="flex justify-end md:col-span-2">
          <BaseButton
            type="submit"
            :disabled="!meta.valid || isSubmitting || uiStore.getUIIsLoading"
            :is-loading="isSubmitting"
          >
            Suivant
          </BaseButton>
        </div>
      </Form>

      <!-- Step 2: Company Information -->
      <Form
        v-if="currentStep === 2"
        v-slot="{ meta, isSubmitting }"
        :validation-schema="stepSchemas[2]"
        :initial-values="step2Values"
        class="w-full px-4 space-y-4 text-left md:space-y-0 md:px-0 md:grid md:gap-6 md:grid-cols-2"
        @submit="handleStep2Submit"
      >
        <div class="space-y-4 md:col-span-2">
          <BaseInput
            label="Numéro SIRET"
            name="siret"
            type="text"
            autocomplete="organization"
            is-required
          />
        </div>

        <div class="space-y-4 md:col-span-2">
          <BaseInput
            label="Adresse"
            name="address"
            type="text"
            autocomplete="street-address"
            is-required
          />
        </div>

        <div class="space-y-4">
          <BaseInput
            label="Code postal"
            name="postalCode"
            type="text"
            autocomplete="postal-code"
            is-required
          />
        </div>

        <div class="space-y-4">
          <BaseInput
            label="Ville"
            name="city"
            type="text"
            autocomplete="address-level2"
            is-required
          />
        </div>

        <div class="space-y-4 md:col-span-2">
          <BaseInput
            label="Téléphone"
            name="phone"
            type="tel"
            autocomplete="tel"
            is-required
          />
        </div>

        <div class="flex justify-between md:col-span-2">
          <BaseButton
            type="button"
            variant="default"
            :disabled="isSubmitting"
            @click="previousStep"
          >
            Précédent
          </BaseButton>
          <BaseButton
            type="submit"
            :disabled="!meta.valid || isSubmitting || uiStore.getUIIsLoading"
            :is-loading="isSubmitting"
          >
            Suivant
          </BaseButton>
        </div>
      </Form>

      <!-- Step 3: Initial Setup -->
      <Form
        v-if="currentStep === 3"
        v-slot="{ meta, isSubmitting }"
        :validation-schema="stepSchemas[3]"
        :initial-values="step3Values"
        class="w-full px-4 space-y-4 text-left md:space-y-0 md:px-0 md:grid md:gap-6 md:grid-cols-2"
        @submit="handleStep3Submit"
      >
        <div class="space-y-4 md:col-span-2">
          <h2 class="mb-4 text-xl font-semibold">Configuration initiale</h2>
          <p class="mb-6 text-gray-600 dark:text-gray-400">
            Pour commencer à utiliser l'application, nous vous proposons de créer vos premiers destinataires.
          </p>
        </div>

        <div class="space-y-4 md:col-span-2">
          <EmployeeForm
            :company-id="companyId"
            @submit="handleRecipientCreated"
          />
        </div>

        <div class="flex justify-between md:col-span-2">
          <BaseButton
            type="button"
            variant="default"
            :disabled="isSubmitting"
            @click="previousStep"
          >
            Précédent
          </BaseButton>
          <BaseButton
            type="submit"
            :disabled="!meta.valid || isSubmitting || uiStore.getUIIsLoading"
            :is-loading="isSubmitting"
          >
            S'inscrire
          </BaseButton>
        </div>
      </Form>
    </TransitionGroup>
  </div>
</div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import BaseButton from '~/components/Base/BaseButton.vue'
import BaseInput from '~/components/Base/BaseInput.vue'
import BaseRadio from '~/components/Base/BaseRadio.vue'
import BaseProgressBar from '~/components/Base/BaseProgressBar.vue'
import EmployeeForm from '~/components/Employee/EmployeeForm.vue'
import { useRegister } from '~/composables/useRegister'
import { RoleEnum } from '~/types'
import { useHead } from 'unhead'
import { useUiStore } from '~~/store'

const { $pinia } = useNuxtApp()
const uiStore = useUiStore($pinia)

const {
  currentStep,
  totalSteps,
  companyId,
  step1Values,
  step2Values,
  step3Values,
  stepSchemas,
  previousStep,
  handleStep1Submit,
  handleStep2Submit,
  handleStep3Submit,
  handleRecipientCreated,
  submitregister,
} = useRegister()

// Animation direction
const direction = ref<'next' | 'prev'>('next')

// Update direction when changing steps
watch(currentStep, (newStep, oldStep) => {
  direction.value = newStep > oldStep ? 'next' : 'prev'
})

definePageMeta({
  layout: 'default',
  middleware: [
    'is-logged-in-middleware',
  ],
})

useHead({
  title: 'Inscription',
  meta: [
    { name: 'description', content: 'Inscrivez vous pour gérer vos droits à l\'image' },
    { property: 'og:title', content: 'Inscription' },
    { property: 'og:description', content: 'Inscrivez vous pour gérer vos droits à l\'image' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://be-right.co/register' },
    { property: 'og:locale', content: 'fr_FR' },
  ],
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* Reverse animation for previous step */
.slide-enter-from[data-direction="prev"] {
  transform: translateX(-100%);
}

.slide-leave-to[data-direction="prev"] {
  transform: translateX(100%);
}
</style>
