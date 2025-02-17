<template>
<Form
  v-slot="{ meta, isSubmitting, values }"
  :validation-schema="schema"
  :initial-values="initialValues"
  class="grid max-w-4xl grid-cols-1 gap-6 mt-4 md:grid-cols-3 mb-36"
  @submit="submit"
>
  <div class="col-span-3">
    <BaseInput
      label="Nom de l'événement"
      name="name"
      autocomplete="name"
      is-required
    />
  </div>

  <div class="flex flex-col items-center col-span-3 space-y-2 md:col-span-1">
    <label class="block mb-2 text-sm font-bold text-blue dark:text-gray-100">
      Dates de l'événement&nbsp;*&nbsp;:
    </label>
    <Field
      v-slot="{ field }"
      name="period"
    >
      <ClientOnly>
        <DatePicker
          v-model.range="values.period"
          v-bind="field"
          color="purple"
          is-required
          locale="fr"
          mode="date"
          range
        />
      </ClientOnly>
    </Field>
    <ErrorMessage name="period" />
  </div>

  <BaseTextarea
    class="col-span-3 md:col-span-2"
    label="Description de l'événement"
    name="description"
    autocomplete="description"
  />

  <div class="grid grid-cols-1 col-span-3 gap-4 md:grid-cols-2">
    <BaseInput
      label="Adresse"
      name="addressLine"
      autocomplete="addressLine"
      is-required
    />
    <BaseInput
      label="Complément d'adresse"
      name="addressLine2"
      autocomplete="addressLine"
    />
  </div>

  <div class="grid grid-cols-1 col-span-3 gap-4 md:grid-cols-3">
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
  </div>

  <div class="flex items-center justify-center col-span-3 mt-6">
    <BaseButton
      :disabled="!meta.valid"
      :is-loading="uiStore.getUIIsLoading || isSubmitting"
      type="submit"
    >
      <template #icon>
        <ArrowDownOnSquareIcon />
      </template>
      {{ !isEditMode ? 'Créer' : 'Enregistrer' }}
    </BaseButton>
  </div>
</Form>
</template>

<script setup lang="ts">
import 'v-calendar/dist/style.css'
import { DatePicker } from 'v-calendar'
import type { InferType } from 'yup'
import { date, object, string } from 'yup'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { ArrowDownOnSquareIcon } from '@heroicons/vue/24/outline'
import BaseButton from '~/components/Base/BaseButton.vue'
import BaseInput from '~/components/Base/BaseInput.vue'
import BaseTextarea from '~/components/Base/BaseTextarea.vue'
import { ModalModeEnum } from '~~/types'
import type { VeeValidateValues } from '~~/types'
import {
  useAddressStore,
  useEventStore,
  useFormStore,
  useUiStore,
} from '~~/store'
import { RouteNames } from '~~/helpers/routes'

interface Props {
  eventId?: number | null
  mode?: ModalModeEnum | null
}
const props = withDefaults(defineProps<Props>(), {
  eventId: null,
  mode: null,
})

defineEmits<{
  (e: 'submitted', eventId: number): void
}>()

const eventStore = useEventStore()
const uiStore = useUiStore()
const addressStore = useAddressStore()
const formStore = useFormStore()
const { setAddressForm, setEventForm } = formStore

const router = useRouter()

const { IncLoading, DecLoading, resetUiModalState } = uiStore

const isEditMode = computed(() => props.mode === ModalModeEnum.EDIT)
const event = computed(() => props.eventId ? eventStore.getOne(props.eventId) : null)
const eventAddress = computed(() => {
  if (event.value) {
    const address = addressStore.getOne(event.value.addressId as number)
    if (!address) {
      return addressStore.getOne(event.value.addressId) || null
    }
    return address
  }
  return null
})

interface IForm extends InferType<typeof schema> {}

const schema = object({
  name: string().required('le nom de l\'événement est obligatoire'),
  description: string().nullable(),
  period: object().shape({
    start: date().required('La date de début est obligatoire'),
    end: date().required('La date de fin est obligatoire'),
  }).required('L\'événement doit avoir une date de début et une date de fin'),
  addressLine: string().required('L\'adresse est requise'),
  addressLine2: string().nullable(),
  postalCode: string().required('Le code postal est requis'),
  city: string().required('La ville est requise'),
  country: string().required('Le pays est requis'),
})

const initialValues = {
  name: event.value?.name || formStore.eventform.name,
  description: event.value?.description || formStore.eventform.description,
  period: {
    start: event.value?.start || formStore.eventform.start,
    end: event.value?.end || formStore.eventform.end,
  },
  addressLine: eventAddress.value?.addressLine || formStore.addressForm.addressLine,
  addressLine2: eventAddress.value?.addressLine2 || formStore.addressForm.addressLine2,
  postalCode: eventAddress.value?.postalCode || formStore.addressForm.postalCode,
  city: eventAddress.value?.city || formStore.addressForm.city,
  country: eventAddress.value?.country || formStore.addressForm.country || 'France',
}

async function submit(form: VeeValidateValues) {
  IncLoading()
  const formValues = form as IForm
  const payload = {
    event: {
      name: formValues.name,
      description: formValues.description,
      start: formValues.period.start as Date,
      end: formValues.period.end as Date,
    },
    address: {
      addressLine: formValues.addressLine,
      addressLine2: formValues.addressLine2,
      postalCode: formValues.postalCode,
      city: formValues.city,
      country: formValues.country,
    },
  }

  if (!isEditMode.value) {
    setEventForm(payload.event)
    setAddressForm(payload.address)
    router.push({
      name: RouteNames.CREATE_EVENT_STEP_2,
    })
  }

  // if (isEditMode.value && props.eventId) {
  //   const payload = {
  //     ...event.value,
  //     name: formValues.name,
  //     description: formValues.description,
  //     start: formValues.period.start,
  //     end: formValues.period.end,
  //   }
  //   await patchOneEvent(payload as EventType)
  //   if (eventAddress.value && formValues.addressLine && formValues.postalCode && formValues.city && formValues.country) {
  //     if (eventAddress.value.id) {
  //       await patchOneAddress(eventAddress.value.id, {
  //         addressLine: formValues.addressLine,
  //         addressLine2: formValues.addressLine2,
  //         postalCode: formValues.postalCode,
  //         city: formValues.city,
  //         country: formValues.country,
  //       })
  //     } else {
  //       await postOneAddress({
  //         address: {
  //           addressLine: formValues.addressLine,
  //           addressLine2: formValues.addressLine2,
  //           postalCode: formValues.postalCode,
  //           city: formValues.city,
  //           country: formValues.country,
  //         },
  //         eventId: props.eventId,
  //       })
  //     }
  //   }

  //   if (formValues.employees && formValues.employees.length > 0) {
  //     const employeesIds = formValues.employees.filter(id => id) as number[]
  //     const answerAlreadyCreated = answerStore.getManyByEventId(props.eventId).map(answer => answer.employee)
  //     const empToCreateAnswer = employeesIds.filter(empId => !answerAlreadyCreated.includes(empId))
  //     const eventId = props.eventId
  //     if (empToCreateAnswer?.length > 0) {
  //       await postManyAnswers(
  //         eventId,
  //         uniq(empToCreateAnswer),
  //       )
  //     }
  //   }
  //   emit('submitted', props.eventId)
  //   router.push({
  //     name: 'evenement-show-id',
  //     params: {
  //       id: props.eventId,
  //     },
  //   })
  // }
  DecLoading()
  resetUiModalState()
}
</script>
