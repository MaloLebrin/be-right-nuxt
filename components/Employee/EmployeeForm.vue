<template>
<div class="w-full h-full px-4 mt-4">
  <Form
    v-slot="{ meta, isSubmitting, errors, setFieldValue, values }"
    :validation-schema="schema"
    :initial-values="initialValues"
    class="grid grid-cols-2 gap-4"
    @submit="submit"
  >
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

    <div>
      <BaseInput
        label="Adresse email"
        name="email"
        type="email"
        autocomplete="email"
        is-required
      />

      <div
        v-if="hasSuggestion"
        class="flex flex-wrap flex-1 py-1 space-x-2"
      >
        <p
          v-for="suggest in multipleEmailSuggestions({
            firstName: values.firstName,
            lastName: values.lastName,
            email: userStore.getAuthUser?.email || '',
          })"
          :key="suggest"
          class="text-sm text-gray-500 hover:text-orange-500 hover:cursor-pointer hover:underline"
          @click="setFieldValue('email', suggest)"
        >
          {{ suggest }}
        </p>
      </div>
    </div>

    <BaseInput
      label="Téléphone"
      name="phone"
      type="tel"
      autocomplete="tel"
      is-required
    />

    <div class="col-span-2 space-y-2">
      <BaseInput
        label="Adresse"
        name="addressLine"
        type="text"
        autocomplete="street-address"
        is-required
      />
    </div>

    <div class="col-span-2 space-y-2">
      <BaseInput
        label="Complément d'adresse"
        name="addressLine2"
        type="text"
        autocomplete="street-address"
      />
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <BaseInput
        label="Code postal"
        name="postalCode"
        type="text"
        autocomplete="postal-code"
        is-required
      />
      <BaseInput
        label="Ville"
        name="city"
        type="text"
        autocomplete="address-level2"
        is-required
      />
    </div>

    <BaseInput
      label="Pays"
      name="country"
      type="text"
      autocomplete="country"
      is-required
    />

    <div
      v-if="authStore.isAuthUserAdmin"
      class="space-y-2 md:col-span-2"
    >
      <EmployeeUserCombobox />
    </div>

    <div
      v-if="isDebug"
      class="flex flex-col space-y-2 md:col-span-2"
    >
      <p>is Dirty = {{ meta.dirty }}</p>
      <p>is valid = {{ meta.valid }}</p>
      <p
        v-for="error in errors"
        :key="error"
      >
        {{ error }}
      </p>
    </div>

    <div class="flex items-center justify-center mt-6 md:col-span-2">
      <BaseButton
        :disabled="!meta.valid || !meta.dirty || isSubmitting"
        :is-loading="uiStore.getUIIsLoading || isSubmitting"
        type="submit"
      >
        <template #icon>
          <ArrowDownOnSquareIcon />
        </template>
        Créer
      </BaseButton>
    </div>
  </Form>
</div>
</template>

<script setup lang="ts">
import { ArrowDownOnSquareIcon } from '@heroicons/vue/24/outline'
import { number, object, string } from 'yup'
import { Form } from 'vee-validate'
import BaseButton from '../Base/BaseButton.vue'
import BaseInput from '../Base/BaseInput.vue'
import EmployeeUserCombobox from '~~/components/Employee/EmployeeUserCombobox.vue'
import type { AddressType, EmployeeType, VeeValidateValues } from '@/types'
import { ModalModeEnum } from '@/types'
import { useAuthStore, useEmployeeStore, useUiStore, useUserStore } from '~~/store'

interface Props {
  employee?: EmployeeType | null
  address?: AddressType | null
  eventId?: number
  userId?: number
  isDebug?: boolean
  hasSuggestion?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  employee: null,
  address: null,
  mode: ModalModeEnum.CREATE,
  eventId: 0,
  userId: 0,
})

const emit = defineEmits<{
  (e: 'submit'): void
}>()

const userStore = useUserStore()
const authStore = useAuthStore()
const employeeStore = useEmployeeStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore

const {
  postOne: postOneEmployee,
  postManyForEvent,
  postOneAdminForUser,
} = employeeHook()

const router = useRouter()

const schema = (authStore.isAuthUserAdmin)
  ? object({
    email: string().email('vous devez entrer in email valide').required('L\'adresse email est requise'),
    firstName: string().required('Le prénom est requis'),
    lastName: string().required('Le nom est requis'),
    phone: string().required('Le numéro de téléphone est requis'),
    addressLine: string().required('L\'adresse est requise'),
    addressLine2: string().nullable(),
    postalCode: string().required('Le code postal est requis'),
    city: string().required('La ville est requise'),
    country: string().required('Le pays est requis'),
    userId: number().required('L\'identifiant de l\'utilisateur est requis'),
  })
  : object({
    email: string().email('vous devez entrer in email valide').required('L\'adresse email est requise'),
    firstName: string().required('Le prénom est requis'),
    lastName: string().required('Le nom est requis'),
    phone: string().required('Le numéro de téléphone est requis'),
    addressLine: string().required('L\'adresse est requise'),
    addressLine2: string().nullable(),
    postalCode: string().required('Le code postal est requis'),
    city: string().required('La ville est requise'),
    country: string().required('Le pays est requis'),
  })

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  addressLine: '',
  addressLine2: null,
  postalCode: '',
  city: '',
  country: 'France',
  userId: null,
}

async function submit(form: VeeValidateValues) {
  IncLoading()

  const employeeToPost = {
    email: form.email,
    firstName: form.firstName,
    lastName: form.lastName,
    phone: form.phone,
  } as EmployeeType

  if (props.eventId && userStore.getAuthUser?.companyId) {
    await postManyForEvent([employeeToPost],
      props.eventId, userStore.getAuthUser?.companyId)
  } else {
    const address = {
      addressLine: form.addressLine,
      addressLine2: form.addressLine2,
      postalCode: form.postalCode,
      city: form.city,
      country: form.country,
    } as AddressType

    if (authStore.isAuthUserAdmin) {
      await postOneAdminForUser({
        employee: employeeToPost,
        address,
        userId: form.userId,
      })
    } else {
      await postOneEmployee(employeeToPost, address)
    }
  }

  const employee = employeeStore.getWhereArray(emp =>
    emp.email === employeeToPost.email
    && emp.firstName === employeeToPost.firstName
    && emp.lastName === employeeToPost.lastName
    && emp.phone === employeeToPost.phone,
  )[0]

  router.push({
    name: 'destinataire',
    query: {
      id: employee?.id,
    },
  })
  emit('submit')
  DecLoading()
}
</script>
