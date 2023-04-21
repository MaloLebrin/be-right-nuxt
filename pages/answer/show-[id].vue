<template>
<div class="h-full">
  <BaseLoader v-if="uiStore.getUIIsLoading" />

  <div
    v-else
    class="relative overflow-hidden bg-gray-900 h-96 isolate sm:py-32"
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
          class="mt-4 space-y-4"
        >
          <BasePinCodeInput :digit-count="4" />
          <div class="flex justify-center">
            <BaseButton>
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
      <BaseButton>
        Retour
      </BaseButton>
    </div>
  </BaseMessage>
</div>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import BaseButton from '~/components/Base/BaseButton.vue'
import BasePinCodeInput from '~/components/Base/BasePinCodeInput.vue'
import BaseLoader from '~/components/Base/BaseLoader.vue'
import BaseMessage from '~/components/Base/BaseMessage.vue'
import type { AnswerType, EmployeeType, EventType } from '~/store'
import { useAuthStore, useUiStore } from '~/store'
import type { ErrorResponse } from '~/types'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore

interface State {
  errorMessages: string[]
  answer: AnswerType | null
  event: EventType | null
  employee: EmployeeType | null
}

const state = reactive<State>({
  errorMessages: [],
  answer: null,
  event: null,
  employee: null,
})

interface Response { answer: AnswerType; event: EventType; employee: EmployeeType }

onMounted(async () => {
  IncLoading()
  const { query: { email = 'malolebrin@icloud.com', token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoxOCwiZXZlbnRJZCI6MTEsImVtYWlsIjoibWFsb2xlYnJpbkBpY2xvdWQuY29tIiwiZmlyc3ROYW1lIjoiTWFsbyIsImxhc3ROYW1lIjoiTGVicmluIiwiZnVsbE5hbWUiOiJNYWxvIExlYnJpbiIsInVuaUpXVCI6ImdOWld4V2dYSlpCY2IwcnU5dGdqYVpIMUNUSUYxRnAzSHFLWFRXUmZlNDYwM29nSGVrUlNpNXRGejJ1XzdTbDdkWHJhX0R0eHBmdnZNa0NSd1dZaGRHbnVtUENOLTAzZUxfbjgwTE10VGJKdG9jeUZRTHZxck1GYjFwTFp5YVY1IiwiaWF0IjoxNjgxODQ4MTY3fQ.RrLF_iD_Nicx48OUaCnIJ3x1aZMPlpnJ0VZtpnrwEzY' } } = route

  if (!authStore.getIsLoggedIn && !email && !token) {
    router.replace({
      name: 'answer-error',
    })
  } else {
    const { $api, $toast } = useNuxtApp()

    const { success, data } = await $api().get<
      ErrorResponse | Response>(`answer/forSignature?email=${email}&token=${token}`)

    if (!success) {
      const error = data as ErrorResponse
      state.errorMessages.push(error.message)
      $toast.error(error.message)
    }
    if (data) {
      const result = data as Response
      state.answer = result.answer
      state.employee = result.employee
      state.event = result.event
    }
  }
  DecLoading()
})

useHead({
  title: 'Signer un document',
})

definePageMeta({
  layout: 'employee',
})
</script>
// answer/forSignature
<!-- -show-16?email=malolebrin@icloud.com&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoxOCwiZXZlbnRJZCI6MTEsImVtYWlsIjoibWFsb2xlYnJpbkBpY2xvdWQuY29tIiwiZmlyc3ROYW1lIjoiTWFsbyIsImxhc3ROYW1lIjoiTGVicmluIiwiZnVsbE5hbWUiOiJNYWxvIExlYnJpbiIsInVuaUpXVCI6ImdOWld4V2dYSlpCY2IwcnU5dGdqYVpIMUNUSUYxRnAzSHFLWFRXUmZlNDYwM29nSGVrUlNpNXRGejJ1XzdTbDdkWHJhX0R0eHBmdnZNa0NSd1dZaGRHbnVtUENOLTAzZUxfbjgwTE10VGJKdG9jeUZRTHZxck1GYjFwTFp5YVY1IiwiaWF0IjoxNjgxODQ4MTY3fQ.RrLF_iD_Nicx48OUaCnIJ3x1aZMPlpnJ0VZtpnrwEzY -->
