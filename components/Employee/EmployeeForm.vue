<template>
<div class="w-full h-full px-4 mt-4">
  <Form
    v-slot="{ meta, isSubmitting, values, errors }"
    :validation-schema="schema"
    :initial-values="initialValues"
    class="grid grid-cols-2 gap-4"
    @submit="submit"
  >
    <BaseInput
      label="Prénom"
      name="firstName"
      type="text"
      autocomplete="firstName"
      is-required
    />

    <BaseInput
      label="Nom"
      name="lastName"
      type="text"
      autocomplete="lastName"
      is-required
    />

    <BaseInput
      class="col-span-2"
      label="Adresse email"
      name="email"
      type="email"
      autocomplete="email"
      is-required
    />

    <BaseInput
      label="Téléphone"
      name="phone"
      type="tel"
      autocomplete="phone"
      is-required
    />

    <div class="col-span-2 space-y-2">
      <BaseInput
        label="Adresse"
        name="addressLine"
        autocomplete="addressLine"
        is-required
      />
    </div>

    <div class="col-span-2 space-y-2">
      <BaseInput
        label="Complément d'adresse"
        name="addressLine2"
        autocomplete="addressLine"
      />
    </div>

    <BaseInput
      label="Code postal"
      name="postalCode"
      autocomplete="postalCode"
      is-required
    />

    <BaseInput
      label="Ville"
      name="city"
      autocomplete="city"
      is-required
    />

    <BaseInput
      label="Pays"
      name="country"
      autocomplete="country"
      is-required
    />

    <div
      v-if="authStore.isAuthUserAdmin && mode !== ModalModeEnum.EDIT"
      class="space-y-2 md:col-span-2"
    >
      <BaseSelect
        label="Id de l'utilisateur"
        name="userId"
        placeholder="Choisissez un utilisateur"
        :display-value="getUserfullName(userStore.getOne(values.userId))"
        is-required
      >
        <BaseOption
          v-for="user in userStore.getAllArray"
          :key="user.id"
          :value="user.id"
          :name="getUserfullName(user)"
        />
      </BaseSelect>
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
          <ArrowDownOnSquareIconOutline />
        </template>
        {{ mode === ModalModeEnum.CREATE ? 'Créer' : 'Enregistrer' }}
      </BaseButton>
    </div>
  </Form>
</div>
</template>

<script setup lang="ts">
import { number, object, string } from 'yup'
import { Form } from 'vee-validate'
import type { AddressType, EmployeeType, VeeValidateValues } from '@/types'
import { ModalModeEnum } from '@/types'
import { useAuthStore, useEventStore, useUiStore, useUserStore } from '~~/store'

interface Props {
  employee?: EmployeeType | null
  address?: AddressType | null
  mode?: ModalModeEnum
  eventId?: number
  userId?: number
  isDebug?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  employee: null,
  mode: ModalModeEnum.CREATE,
  eventId: 0,
  userId: 0,
})

const emit = defineEmits<{
  (e: 'submit'): void
}>()

const userStore = useUserStore()
const eventStore = useEventStore()
const authStore = useAuthStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore

const { patchOne, postOne: postOneEmployee, postManyForEvent } = employeeHook()
const { patchOne: patchOneAddress } = addressHook()
const { getUserfullName } = userHook()

const router = useRouter()

const userIdField = computed(() => {
  if (authStore.isAuthUserAdmin) {
    return props.employee?.createdByUserId || null
  }
  return userStore.getAuthUserId
})

const schema = object({
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

const initialValues = {
  email: props.employee?.email || '',
  firstName: props.employee?.firstName || '',
  lastName: props.employee?.lastName || '',
  phone: props.employee?.phone || '',
  addressLine: props.address?.addressLine || '',
  addressLine2: props.address?.addressLine2 || null,
  postalCode: props.address?.postalCode || '',
  city: props.address?.city || '',
  country: props.address?.country || 'France',
  userId: userIdField.value,
}

async function submit(form: VeeValidateValues) {
  IncLoading()

  const employeeToPost = {
    email: form.email,
    firstName: form.firstName,
    lastName: form.lastName,
    phone: form.phone,
  } as EmployeeType

  if (props.mode === ModalModeEnum.CREATE) {
    if (props.eventId) {
      const createdByUserId = eventStore.getOne(props.eventId)?.createdByUserId
      await postManyForEvent([employeeToPost],
        props.eventId, createdByUserId)
    } else {
      if (userStore.getAuthUserId) {
        const createdByUserId = authStore.isAuthUserAdmin ? form.userId! : userStore.getAuthUserId

        const address = {
          addressLine: form.addressLine,
          addressLine2: form.addressLine2,
          postalCode: form.postalCode,
          city: form.city,
          country: form.country,
        } as AddressType

        await postOneEmployee(employeeToPost, address, createdByUserId)
      }
    }
  } else if (props.mode === ModalModeEnum.EDIT && props.employee) {
    await patchOne(props.employee.id, { ...employeeToPost, createdByUserId: props.employee.createdByUserId })

    if (props.address) {
      await patchOneAddress(props.address.id, {
        addressLine: form.addressLine,
        addressLine2: form.addressLine2,
        postalCode: form.postalCode,
        city: form.city,
        country: form.country,
      })
    }
  }
  router.push({
    name: 'destinataire',
  })
  emit('submit')
  DecLoading()
}
</script>
