<template>
<Form
  v-if="!isSuccess"
  v-slot="{ meta, isSubmitting }"
  :validation-schema="schema"
  class="w-full max-w-md lg:col-span-6 lg:pt-2"
  @submit="submit"
>
  <div class="flex gap-x-4">
    <BaseInput
      type="email"
      name="email"
      autocomplete="email"
      is-required
      placeholder="Votre e-mail"
    />
    <BaseButton
      :disabled="!meta.valid || !meta.dirty || isSubmitting"
      type="submit"
      data-test-id="newletter-submit-button"
      title="S'abonner à la newletter"
      :is-loading="uiStore.getUIIsLoading || isSubmitting"
    >
      Envoyer
    </BaseButton>
  </div>
</Form>

<BaseMessage
  v-else
  type="success"
>
  Merci pour votre inscription!
</BaseMessage>
</template>

<script setup lang="ts">
import { object, string } from 'yup'
import { Form } from 'vee-validate'
import BaseButton from '../Base/BaseButton.vue'
import BaseInput from '../Base/BaseInput.vue'
import BaseMessage from '../Base/BaseMessage.vue'
import { useUiStore } from '~~/store'
import newsletterHook from '~/composables/newsletterHook'

const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const { addToContactList } = newsletterHook()

const isSuccess = ref(false)

const schema = object({
  email: string().email('vous devez entrer in email valide').required('L\'adresse email est requise'),
})

async function submit(form: any) {
  const { $toast } = useNuxtApp()
  IncLoading()
  const response = await addToContactList({
    email: form.email,
  })

  isSuccess.value = response?.status === 201
  if (isSuccess.value) {
    $toast.success('Merci pour votre inscription!')
  } else {
    $toast.denied('Une erreur est survenue!')
  }
  DecLoading()
}
</script>
