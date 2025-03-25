<template>
<Form
  v-slot="{ meta, isSubmitting }"
  :validation-schema="schema"
  :initial-values="initialValues"
  class="container grid grid-cols-1 gap-12 py-6 mx-auto"
  @submit="submitregister"
>
  <div class="flex flex-col mx-auto space-y-12 md:max-w-1/2">
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

    <!-- Step 1: Basic Information -->
    <div
      v-if="currentStep === 1"
      class="px-4 space-y-4 text-left md:space-y-0 md:px-0 md:grid md:gap-6 md:grid-cols-2">
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
    </div>

    <!-- Step 2: Company Information -->
    <div
      v-if="currentStep === 2"
      class="px-4 space-y-4 text-left md:space-y-0 md:px-0 md:grid md:gap-6 md:grid-cols-2">
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
    </div>

    <!-- Step 3: Initial Setup -->
    <div
      v-if="currentStep === 3"
      class="px-4 space-y-4 text-left md:space-y-0 md:px-0 md:grid md:gap-6 md:grid-cols-2">
      <div class="space-y-4 md:col-span-2">
        <h2 class="mb-4 text-xl font-semibold">Configuration initiale</h2>
        <p class="mb-6 text-gray-600 dark:text-gray-400">
          Pour commencer à utiliser l'application, nous vous proposons de configurer quelques éléments essentiels.
        </p>
      </div>

      <div class="space-y-4 md:col-span-2">
        <BaseCheckbox
          name="setupNotifications"
          label="Configurer les notifications"
          :value="false"
        />
      </div>

      <div class="space-y-4 md:col-span-2">
        <BaseCheckbox
          name="createRecipients"
          label="Créer mes premiers destinataires"
          :value="false"
        />
      </div>

      <div class="space-y-4 md:col-span-2">
        <BaseCheckbox
          name="createGroups"
          label="Créer mes premiers groupes de diffusion"
          :value="false"
        />
      </div>
    </div>

    <!-- Navigation buttons -->
    <div class="flex flex-col items-center justify-center space-y-4 md:col-span-2">
      <div class="flex space-x-4">
        <BaseButton
          v-if="currentStep > 1"
          type="button"
          variant="default"
          @click="previousStep"
        >
          Précédent
        </BaseButton>

        <BaseButton
          v-if="currentStep < totalSteps"
          type="button"
          :disabled="!meta.valid || !meta.dirty || isSubmitting"
          :is-loading="isSubmitting"
          @click="nextStep"
        >
          Suivant
        </BaseButton>

        <BaseButton
          v-if="currentStep === totalSteps"
          type="submit"
          :disabled="!meta.valid || !meta.dirty || isSubmitting"
          :is-loading="isSubmitting"
        >
          S'inscrire
        </BaseButton>
      </div>

      <NuxtLink
        id="already-account-link"
        class="LinkClass"
        :to="{ name: 'login' }"
      >
        J'ai déjà un compte
      </NuxtLink>
    </div>
  </div>
</Form>
</template>

<script setup lang="ts">
import { object, string, boolean } from 'yup'
import { Form } from 'vee-validate'
import BaseButton from '~/components/Base/BaseButton.vue'
import BaseInput from '~/components/Base/BaseInput.vue'
import BaseRadio from '~/components/Base/BaseRadio.vue'
import BaseCheckbox from '~/components/Base/BaseCheckbox.vue'
import BaseProgressBar from '~/components/Base/BaseProgressBar.vue'
import LogoSimpleLogo from '~/components/Logo/SimpleLogo.server.vue'
import type { UserType, VeeValidateValues, WithoutId } from '@/types'
import type { Company } from '~~/store'
import { useAuthStore, useUiStore } from '~~/store'
import { RouteNames } from '~/helpers/routes'
import { RoleEnum } from '~/types'

const { $toast, $api } = useNuxtApp()
const uiStore = useUiStore()
const { storeUsersEntities } = userHook()
const { storeCompanyEntities } = companyHook()
const { jwtDecode, getCookie } = authHook()
const { IncLoading, DecLoading } = uiStore
const authStore = useAuthStore()
const { setJWTasUser, setToken } = authStore
const router = useRouter()

const currentStep = ref(1)
const totalSteps = 3

const schema = object({
  roles: string()
    .oneOf([RoleEnum.PHOTOGRAPHER, RoleEnum.OWNER], 'Vous devez renseigner un rôle')
    .required('Le rôle est requis'),
  companyName: string().required('Le nom de l\'entreprise est requis'),
  firstName: string().required('Le prénom est requis'),
  lastName: string().required('Le nom est requis'),
  email: string().email('vous devez entrer un email valide').required('L\'adresse email est requise'),
  password: string().required('Le mot de passe est requis'),
  siret: string().when('roles', {
    is: RoleEnum.OWNER,
    then: schema => schema.required('Le numéro SIRET est requis'),
    otherwise: schema => schema.nullable(),
  }),
  address: string().when('roles', {
    is: RoleEnum.OWNER,
    then: schema => schema.required('L\'adresse est requise'),
    otherwise: schema => schema.nullable(),
  }),
  postalCode: string().when('roles', {
    is: RoleEnum.OWNER,
    then: schema => schema.required('Le code postal est requis'),
    otherwise: schema => schema.nullable(),
  }),
  city: string().when('roles', {
    is: RoleEnum.OWNER,
    then: schema => schema.required('La ville est requise'),
    otherwise: schema => schema.nullable(),
  }),
  phone: string().when('roles', {
    is: RoleEnum.OWNER,
    then: schema => schema.required('Le numéro de téléphone est requis'),
    otherwise: schema => schema.nullable(),
  }),
  setupNotifications: boolean().nullable(),
  createRecipients: boolean().nullable(),
  createGroups: boolean().nullable(),
})

const initialValues = {
  roles: '',
  companyName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  siret: '',
  address: '',
  postalCode: '',
  city: '',
  phone: '',
  setupNotifications: false,
  createRecipients: false,
  createGroups: false,
}

function nextStep() {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

function previousStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function isStepValid(step: number) {
  switch (step) {
    case 1:
      return true // Basic validation is handled by the form
    case 2:
      return true // Company validation is handled by the form
    case 3:
      return true // No validation needed for checkboxes
    default:
      return false
  }
}

async function submitregister(form: VeeValidateValues) {
  const cookieToken = getCookie()
  IncLoading('Inscription en cours...')

  try {
    const { data } = await $api().post<{ user: UserType; company: Company }>('user/signup', form as WithoutId<UserType>)
    
    if (data) {
      const { user, company } = data
      if (user?.token && company) {
        $api().setCredentials(user.token)
        storeCompanyEntities(company)
        storeUsersEntities(user, false)
        cookieToken.value = user.token
        const decode = jwtDecode(ref(user.token))
        setToken(user.token)

        if (decode.value) {
          setJWTasUser(decode.value)
        }

        $toast.success(`Bienvenue ${getUserfullName(user)}`)
        router.replace({
          name: authStore.isAuthUserAdmin ? RouteNames.ADMIN_EVENTS : RouteNames.LIST_EVENT,
        })
      }
    }
  } catch (error) {
    console.error(error)
    $toast.danger('Une erreur est survenue lors de l\'inscription')
  }

  DecLoading()
}

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
