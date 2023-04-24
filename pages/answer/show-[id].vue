<template>
<div class="h-full">
  <BaseLoader v-if="uiStore.getUIIsLoading" />

  <div
    v-else
    class="sm:py-32"
  />

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
import BaseLoader from '~/components/Base/BaseLoader.vue'
import BaseMessage from '~/components/Base/BaseMessage.vue'
import { useAnswerStore, useEmployeeStore, useEventStore, useUiStore } from '~/store'

const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const route = useRoute()
const answerStore = useAnswerStore()
const eventStore = useEventStore()
const employeeStore = useEmployeeStore()

interface State {
  errorMessages: string[]
}

const state = reactive<State>({
  errorMessages: [],
})

onMounted(async () => {
  IncLoading()
  const { params } = route
  const answerId = params?.id
  if (answerId) {
    const answer = answerStore.getOne(answerId)
    const event = eventStore.getOne(answer?.eventId)
    const employee = employeeStore.getOne(answer?.employeeId)
    if (!answer || !event || !employee) {
      state.errorMessages.push('Données manquantes')
    }
  } else {
    state.errorMessages.push('Identifiant manquant')
  }
  DecLoading()
})

useHead({
  title: 'Signer un document',
  meta: [
    { name: 'description', content: 'Vous pouvez signer votre droit à l\'image en toute sécurité' },
  ],
})

definePageMeta({
  layout: 'employee',
})
</script>
// FIXME Remove this comments answer/forSignature  OYJRE
<!-- -show-16?email=malolebrin@icloud.com&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoxOCwiZXZlbnRJZCI6MTEsImVtYWlsIjoibWFsb2xlYnJpbkBpY2xvdWQuY29tIiwiZmlyc3ROYW1lIjoiTWFsbyIsImxhc3ROYW1lIjoiTGVicmluIiwiZnVsbE5hbWUiOiJNYWxvIExlYnJpbiIsInVuaUpXVCI6ImdOWld4V2dYSlpCY2IwcnU5dGdqYVpIMUNUSUYxRnAzSHFLWFRXUmZlNDYwM29nSGVrUlNpNXRGejJ1XzdTbDdkWHJhX0R0eHBmdnZNa0NSd1dZaGRHbnVtUENOLTAzZUxfbjgwTE10VGJKdG9jeUZRTHZxck1GYjFwTFp5YVY1IiwiaWF0IjoxNjgxODQ4MTY3fQ.RrLF_iD_Nicx48OUaCnIJ3x1aZMPlpnJ0VZtpnrwEzY -->
