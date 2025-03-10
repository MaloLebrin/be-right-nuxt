<template>
<Form
  v-slot="{ meta, isSubmitting, errors }"
  :validation-schema="validationSchema"
  :initial-values="initialValues"
  class="grid w-full max-w-xl grid-cols-1 gap-6 mt-4 md:grid-cols-2"
  @submit="submit"
>
  <BaseInput
    wrapper-classes="md:col-span-2"
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

  <div class="w-full mx-auto space-y-4 md:col-span-2">
    <RadioGroup v-model="selected">
      <RadioGroupLabel class="block mb-4 text-sm font-bold text-blue dark:text-gray-100">
        Méthode d'ajout de destinatires
      </RadioGroupLabel>
      <div class="grid grid-cols-2 gap-2">
        <GroupFormRadioOption
          title="Choisir parmi mes destinataires"
          description="Vous pouvez choisir parmis tous les destinataires préalablement créés."
          value="list"
        />
        <GroupFormRadioOption
          title="Importer une liste"
          description="Vous pouvez importer des destinataires à partir un fichier CSV"
          value="csv"
        />
      </div>
    </RadioGroup>
  </div>

  <div
    v-show="selected === 'list'"
    class="md:col-span-2"
  >
    <EmployeeComboboxSelector
      name="employeeIds"
      :default-values="employeeStore.getAllArray"
      value-key="id"
      is-required
    />
  </div>

  <BaseInputFileButton
    v-show="selected === 'csv'"
    name="file"
    class="md:col-span-2"
  />

  <BaseFormDebug
    v-if="isDebug"
    class="md:col-span-2"
    :errors="errors"
    :meta="meta"
  />

  <div class="flex items-center justify-center mt-6 md:col-span-2">
    <BaseButton
      :disabled="!meta.valid || !meta.dirty"
      :is-loading="uiStore.getUIIsLoading || isSubmitting"
      type="submit"
    >
      <template #icon>
        <ArrowDownOnSquareIcon />
      </template>
      Enregistrer
    </BaseButton>
  </div>
</Form>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { array, number, object, string } from 'yup'
import { RadioGroup, RadioGroupLabel } from '@headlessui/vue'
import { ArrowDownOnSquareIcon } from '@heroicons/vue/24/outline'
import { useEmployeeStore, useUiStore, useUserStore } from '~~/store'
import type { VeeValidateValues } from '~~/types'
import EmployeeComboboxSelector from '~~/components/Employee/EmployeeComboboxSelector.vue'
import BaseButton from '~~/components/Base/BaseButton.vue'
import BaseInputFileButton from '~~/components/Base/BaseInputFileButton.vue'
import BaseTextarea from '~~/components/Base/BaseTextarea.vue'
import BaseFormDebug from '~~/components/Base/BaseFormDebug.vue'
import BaseInput from '~~/components/Base/BaseInput.vue'
import GroupFormRadioOption from '~~/components/Group/Form/RadioOption.vue'

interface Props {
  isDebug?: boolean
}

defineProps<Props>()

const uiStore = useUiStore()
const employeeStore = useEmployeeStore()

const { postOne, postOneCSV } = groupHook()
const { fetchOne } = companyHook()
const userStore = useUserStore()

const selected = ref<'list' | 'csv'>('list')

const validationSchema = computed(() => {
  if (selected.value === 'list') {
    return object({
      name: string().required('le nom de l\'événement est obligatoire'),
      description: string().nullable(),
      employeeIds: array(number())
        .min(1, 'Sélectionnez au moins un destinataire')
        .required('Les destinataires sont requis'),
    })
  }

  if (selected.value === 'csv') {
    return object({
      name: string().required('le nom de l\'événement est obligatoire'),
      description: string().nullable(),
      file: string().required('Le fichier CSV est requis'),
    })
  }
  return object({})
})

const initialValues = {
  name: null,
  description: null,
  employeeIds: [],
  file: null,
}

async function submit(form: VeeValidateValues) {
  const router = useRouter()

  if (selected.value === 'list') {
    await postOne({
      name: form.name,
      description: form.description,
      employeeIds: form.employeeIds,
    })
  }

  if (selected.value === 'csv') {
    const formData = new FormData()
    formData.set('file', form.file, 'file')
    formData.set('name', form.name)
    formData.set('description', form.description)
    await postOneCSV(formData)
  }

  if (userStore.getAuthUser?.companyId) {
    await fetchOne(userStore.getAuthUser?.companyId)
  }

  router.push({
    name: 'groupe',
  })
}
</script>
