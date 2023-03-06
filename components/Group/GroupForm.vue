<template>
<Form
  v-slot="{ meta, isSubmitting, errors }"
  :validation-schema="schema"
  :initial-values="initialValues"
  class="grid w-full max-w-xl grid-cols-1 gap-6 mt-4"
  @submit="submit"
>
  <BaseInput
    label="Nom du groupe"
    name="name"
    autocomplete="name"
    is-required
  />

  <BaseTextarea
    class="md:col-span-2"
    label="Description du groupe"
    name="description"
    autocomplete="description"
  />

  <BaseMultipleSelect
    :values="employeeStore.getAllArray"
    value-key="id"
    :display-key="getEmployeeFullname"
    label="Choix des destinataires"
    name="employeeIds"
    placeholder="Choisissez des destinataires"
    is-required
  />

  <BaseFormDebug
    v-if="isDebug"
    :errors="errors"
    :meta="meta"
  />

  <div class="flex items-center justify-center mt-6">
    <BaseButton
      :disabled="!meta.valid || !meta.dirty"
      :is-loading="uiStore.getUIIsLoading || isSubmitting"
      type="submit"
    >
      <template #icon>
        <ArrowDownOnSquareIconOutline />
      </template>
      Enregistrer
    </BaseButton>
  </div>
</Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { array, number, object, string } from 'yup'
import { useEmployeeStore, useUiStore } from '~~/store'
import type { VeeValidateValues } from '~~/types'

interface Props {
  isDebug?: boolean
}

defineProps<Props>()

const uiStore = useUiStore()
const employeeStore = useEmployeeStore()

const { getEmployeeFullname } = employeeHook()
const { postOne } = groupHook()

const schema = object({
  name: string().required('le nom de l\'événement est obligatoire'),
  description: string().nullable(),
  employeeIds: array(number()).required('Les destinataires sont requis'),
})

const initialValues = {
  name: null,
  description: null,
  employeeIds: [],
}

async function submit(form: VeeValidateValues) {
  const router = useRouter()

  await postOne({
    name: form.name,
    description: form.description,
    employeeIds: form.employeeIds,
  })

  router.push({
    name: 'groupe',
  })
}
</script>
