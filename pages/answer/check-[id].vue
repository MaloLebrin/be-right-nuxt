<template>
<div class="h-full">
  <BaseLoader v-if="uiStore.getUIIsLoading" />

  <div
    v-else
    class="relative overflow-hidden bg-gray-900 min-h-96 isolate sm:py-32"
  >
    <img
      src="https://images.unsplash.com/photo-1516283182395-4b90237bff2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
      alt=""
      class="absolute inset-0 object-cover w-full h-full -z-10 backdrop-grayscale bg-red"
    >
    <div class="h-full px-6 pt-10 mx-auto max-w-7xl lg:px-8 backdrop-grayscale bg-black/40">
      <div class="max-w-2xl mx-auto lg:mx-0">
        <h2 class="text-4xl font-bold tracking-tight text-center text-white sm:text-6xl">
          Vous avez un document à signer
        </h2>
        <p class="mt-6 text-lg leading-8 text-center text-gray-300">
          Pour continuer vous devez rentrer le code reçu par email
        </p>

        <Form
          v-slot="{ meta, isSubmitting, errors }"
          class="py-4 space-y-4"
          :validation-schema="schema"
          @submit="checkDoubleAuth"
        >
          <BasePinCodeInput
            :digit-count="5"
            name="twoFactorCode"
          />
          <div class="flex justify-center">
            <BaseButton
              :disabled="!meta.valid || !meta.dirty"
              :is-loading="uiStore.getUIIsLoading || isSubmitting"
              type="submit"
              :title="errors.twoFactorCode || 'Vérifier mon identiter'"
            >
              Vérifier
            </BaseButton>
          </div>
        </Form>
      </div>
    </div>
  </div>

  <BaseMessage
    v-if="state.errorMessages?.length > 0"
    type="danger"
  >
    <div class="space-y-4">
      <p
        v-for="message in state.errorMessages"
        :key="message"
      >
        {{ message }}
      </p>
      <BaseButton :href="{ name: 'index' }">
        Retour
      </BaseButton>
    </div>
  </BaseMessage>
</div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import { object, string } from 'yup'
import BaseButton from '~/components/Base/BaseButton.vue'
import BasePinCodeInput from '~/components/Base/BasePinCodeInput.vue'
import BaseLoader from '~/components/Base/BaseLoader.vue'
import BaseMessage from '~/components/Base/BaseMessage.vue'
import { useAnswerStore, useEmployeeStore, useEventStore, useUiStore } from '~/store'
import type { ErrorResponse, ResponseAnswerSignature, VeeValidateValues } from '~/types'

const route = useRoute()
const router = useRouter()

const answerStore = useAnswerStore()
const eventStore = useEventStore()
const employeeStore = useEmployeeStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const { $toast, $api } = useNuxtApp()
const { getAnswerForSignature } = answerHook()

interface State {
  errorMessages: string[]
}

const state = reactive<State>({
  errorMessages: [],
})

const schema = object({
  twoFactorCode: string()
    .matches(/^[a-zA-Z0-9]+$/)
    .min(5, 'Veuillez remplir les 5 cases')
    .max(5, 'Vous devez remplir 5 cases')
    .required('Le code vérification est obligatoire'),
})

const { query: { email = 'malolebrin@icloud.com', token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoxOCwiZXZlbnRJZCI6MTEsImVtYWlsIjoibWFsb2xlYnJpbkBpY2xvdWQuY29tIiwiZmlyc3ROYW1lIjoiTWFsbyIsImxhc3ROYW1lIjoiTGVicmluIiwiZnVsbE5hbWUiOiJNYWxvIExlYnJpbiIsInVuaUpXVCI6ImdOWld4V2dYSlpCY2IwcnU5dGdqYVpIMUNUSUYxRnAzSHFLWFRXUmZlNDYwM29nSGVrUlNpNXRGejJ1XzdTbDdkWHJhX0R0eHBmdnZNa0NSd1dZaGRHbnVtUENOLTAzZUxfbjgwTE10VGJKdG9jeUZRTHZxck1GYjFwTFp5YVY1IiwiaWF0IjoxNjgxODQ4MTY3fQ.RrLF_iD_Nicx48OUaCnIJ3x1aZMPlpnJ0VZtpnrwEzY' }, params } = route

async function checkDoubleAuth(form: VeeValidateValues) {
  IncLoading()
  try {
    const { data } = await $api().post<{ message: string; status: number }>('answer/checkDoubleAuth', {
      email,
      token,
      twoFactorCode: form.twoFactorCode,
    })

    const paramters = route.params as Record<string, string>

    if (data?.status === 200 && paramters?.id) {
      $toast.success(data.message)
      router.push({
        name: 'answer-show-id',
        params: {
          id: paramters.id,
        },
      })
    }
  } catch (error) {
    console.error(error)
    $toast.error('Une erreur est survenue')
  }
  DecLoading()
}

onMounted(async () => {
  IncLoading()
  if (!email || !token) {
    router.replace({
      name: 'answer-error',
    })
  } else {
    const res = await getAnswerForSignature({ email: email?.toString(), token: token?.toString() })

    if (res) {
      const { success, data } = res

      if (!success) {
        const error = data as ErrorResponse
        state.errorMessages.push(error.message)
        $toast.error(error.message)
      }
      if (data) {
        const result = data as ResponseAnswerSignature
        employeeStore.addMany([result.employee])
        answerStore.addMany([result.answer])
        eventStore.addMany([result.event])
      }
    }
  }
  DecLoading()
})

useHead({
  title: 'Signer un document',
  meta: [
    { name: 'description', content: 'Nou utilisons un code sécurité pour vérifier votre identité' },
  ],
})

definePageMeta({
  layout: 'employee',
})
</script>
// FIXME Remove this comments answer/forSignature  OYJRE
<!-- -show-16?email=malolebrin@icloud.com&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoxOCwiZXZlbnRJZCI6MTEsImVtYWlsIjoibWFsb2xlYnJpbkBpY2xvdWQuY29tIiwiZmlyc3ROYW1lIjoiTWFsbyIsImxhc3ROYW1lIjoiTGVicmluIiwiZnVsbE5hbWUiOiJNYWxvIExlYnJpbiIsInVuaUpXVCI6ImdOWld4V2dYSlpCY2IwcnU5dGdqYVpIMUNUSUYxRnAzSHFLWFRXUmZlNDYwM29nSGVrUlNpNXRGejJ1XzdTbDdkWHJhX0R0eHBmdnZNa0NSd1dZaGRHbnVtUENOLTAzZUxfbjgwTE10VGJKdG9jeUZRTHZxck1GYjFwTFp5YVY1IiwiaWF0IjoxNjgxODQ4MTY3fQ.RrLF_iD_Nicx48OUaCnIJ3x1aZMPlpnJ0VZtpnrwEzY -->
