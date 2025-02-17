<template>
<Form
  v-slot="{ meta, isSubmitting }"
  :validation-schema="schema"
  :initial-values="initialValues"
  class="w-full max-w-xl mx-auto mt-4 mb-36"
  @submit="submit"
>
  <div class="flex items-center space-x-4">
    <PhotographerComboboxSelector
      name="photographerId"
      :default-values="userStore.getWhereArray(photographer => photographer.roles === RoleEnum.PHOTOGRAPHER)"
      value-key="id"
      wrapper-classes="md:col-span-2 z-20"
      is-required
    />

    <BaseButton
      class="mt-6"
      title="Créer un nouveau photographe"
      @click="toggleCreatePhotographerModal"
    >
      <template #icon>
        <UserPlusIcon aria-hidden="true" />
      </template>
    </BaseButton>
  </div>

  <div class="flex items-center justify-center mt-6">
    <BaseButton
      :disabled="!meta.valid || isSubmitting"
      :is-loading="uiStore.getUIIsLoading || isSubmitting"
      type="submit"
    >
      <template #icon>
        <ArrowDownOnSquareIcon />
      </template>
      valider
    </BaseButton>
  </div>
</Form>
</template>

<script setup lang="ts">
import { ArrowDownOnSquareIcon, UserPlusIcon } from '@heroicons/vue/24/outline'
import { type InferType, number, object } from 'yup'
import { Form } from 'vee-validate'
import PhotographerComboboxSelector from '~/components/Photographer/PhotographerComboboxSelector.vue'
import BaseButton from '~/components/Base/BaseButton.vue'
import { ModalModeEnum, ModalNameEnum, RoleEnum, type VeeValidateValues } from '~~/types'
import { useFormStore, useUiStore, useUserStore } from '~~/store'

const emit = defineEmits<{
  (e: 'submitted', photographerId: number): void
}>()

const uiStore = useUiStore()
const { setUiModal } = uiStore
const userStore = useUserStore()
const formStore = useFormStore()
const { setPhotographerId } = formStore

const schema = object({
  photographerId: number().required('L\'identifiant de l\'utilisateur est requis'),
})

const initialValues = {
  photographerId: formStore.getPhotographerId,
}

interface IForm extends InferType<typeof schema> {}

async function submit(form: VeeValidateValues) {
  const formValues = form as IForm

  setPhotographerId(formValues.photographerId)

  emit('submitted', formValues.photographerId)
}

function toggleCreatePhotographerModal() {
  setUiModal({
    modalName: ModalNameEnum.CREATE_PHOTOGRAPHER,
    modalMode: ModalModeEnum.CREATE,
    isActive: true,
    data: {},
  })
}
</script>
