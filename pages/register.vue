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

    <div class="px-4 space-y-4 text-left md:space-y-0 md:px-0 md:grid md:gap-6 md:grid-cols-2">
      <BaseRadio
        :id="RoleEnum.PHOTOGRAPHER"
        :value="RoleEnum.PHOTOGRAPHER"
        name="roles"
      >
        je suis un photographe
      </BaseRadio>
      <BaseRadio
        :id="RoleEnum.OWNER"
        :value="RoleEnum.OWNER"
        name="roles"
      >
        je suis une enteprise ou un particulier
      </BaseRadio>

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

      <div class="flex flex-col items-center justify-center space-y-4 md:col-span-2">
        <BaseButton
          :disabled="!meta.valid || !meta.dirty || isSubmitting"
          :is-loading="uiStore.getUIIsLoading || isSubmitting"
          type="submit"
          data-test-id="register-submit-button"
        >
          S'inscrire
        </BaseButton>

        <NuxtLink
          id="already-account-link"
          class="LinkClass"
          :to="{ name: 'login' }"
        >
          J'ai déjà un compte
        </NuxtLink>
      </div>
    </div>
  </div>
</Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { object, string } from 'yup'
import BaseButton from '~/components/Base/BaseButton.vue'
import BaseInput from '~/components/Base/BaseInput.vue'
import BaseRadio from '~/components/Base/BaseRadio.vue'
import type { UserType, VeeValidateValues } from '@/types'
import { RoleEnum } from '@/types'
import type { Company } from '~~/store'
import { useAuthStore, useUiStore } from '~~/store'
import { passwordRegex } from '~/helpers/regex'
import newsletterHook from '~/composables/newsletterHook'

const { $toast, $api } = useNuxtApp()
const router = useRouter()
const { checkMailIsAlreadyExist, jwtDecode, getCookie } = authHook()
const { storeUsersEntities } = userHook()
const { storeCompanyEntities } = companyHook()
const { addToContactList } = newsletterHook()
const { setJWTasUser } = useAuthStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore

const schema = object({
  companyName: string().required('Nom de l\'entreprise est requis').label('Nom de l\'entreprise'),
  email: string().email('vous devez entrer in email valide').required('L\'adresse email est requise'),
  password: string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caratères')
    .required('Le mot de passe est requis')
    .matches(
      passwordRegex,
      'Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial',
    ),
  firstName: string().required('Le prénom est requis').label('Prénom'),
  lastName: string().required('le nom est requis').label('Nom'),
  roles: string().oneOf([RoleEnum.PHOTOGRAPHER, RoleEnum.OWNER]),
})

const initialValues = {
  email: '',
  companyName: '',
  password: '',
  firstName: '',
  lastName: '',
  roles: RoleEnum.OWNER,
}

async function submitregister(form: VeeValidateValues) {
  IncLoading()
  const cookieToken = getCookie()

  const isEmailExist = await checkMailIsAlreadyExist(form.email)

  if (isEmailExist && !isEmailExist.success) {
    $toast.danger(isEmailExist.message)
  } else {
    const { data } = await $api().post<{ user: UserType; company: Company }>('auth/signup', form)

    if (data) {
      const { user, company } = data

      if (company) {
        storeCompanyEntities(company)
      }

      if (user) {
        $api().setCredentials(user.token)

        await addToContactList({
          email: user.email,
          name: getUserfullName(user),
        })

        storeUsersEntities(user, false)
        cookieToken.value = user.token
        const decode = jwtDecode(ref(user.token))

        if (decode.value) {
          setJWTasUser(decode.value)
        }
        $toast.success(`Bienvenue ${getUserfullName(user)}`)
        router.replace({
          name: 'evenement',
        })
      }
    }
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
  title: 'S\'inscrire',
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
