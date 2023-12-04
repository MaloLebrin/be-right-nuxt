<template>
<div class="flex items-center mt-2">
  <template v-if="hasBeenAnswered">
    <p
      v-if="!answer.hasSigned"
      class="flex items-center mt-2 text-sm text-gray-500"
    >
      <XCircleIcon
        class="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400"
        aria-hidden="true"
      />
      <span>Refusé le {{ $toFormat(answer.signedAt!, 'D MMMM YYYY') }}</span>
    </p>

    <p
      v-else
      class="flex items-center mt-2 text-sm text-gray-500"
    >
      <CheckCircleIcon
        class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
        aria-hidden="true"
      />
      <span>Signé le {{ $toFormat(answer.signedAt!, 'D MMMM YYYY') }}</span>
    </p>

    <BaseButton
      v-if="$getApiUrl && answer.hasSigned"
      color="green"
      class="ml-4"
      :is-loading="uiStore.getUIIsLoading"
      title="Télécharger"
      @click="download(answer.id)"
    >
      <template #icon>
        <ArrowDownTrayIcon
          class="text-white"
          aria-hidden="true"
        />
      </template>
      Télécharger
    </BaseButton>
    <a
      ref="downloadFile"
    />
  </template>

  <p
    v-else
    class="flex items-center mt-2 text-sm text-gray-500"
  >
    <BaseButton
      :disabled="uiStore.getUIIsLoading"
      :is-loading="uiStore.getUIIsLoading"
      title="Relancer"
      @click="raise"
    >
      <template #icon>
        <EnvelopeIcon
          class="text-gray-200"
          aria-hidden="true"
        />
      </template>
      Relancer
    </BaseButton>
  </p>

  <BaseMessage
    v-if="responseMessage"
    :type="isGreenMessage ? 'success' : 'danger'"
  >
    {{ responseMessage }}
  </BaseMessage>
</div>
</template>

<script setup lang="ts">
import { ArrowDownTrayIcon, CheckCircleIcon, EnvelopeIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import type { AnchorHTMLAttributes } from 'nuxt/dist/app/compat/capi'
import BaseButton from '../Base/BaseButton.vue'
import BaseMessage from '../Base/BaseMessage.vue'
import type { AnswerType, EmployeeType } from '~~/store'
import { useUiStore } from '~~/store'

interface Props {
  answer: AnswerType
  employee: EmployeeType
  eventName: string
}

const props = defineProps<Props>()

const hasBeenAnswered = computed(() =>
  noNull(props.answer.hasSigned)
  && noUndefined(props.answer.hasSigned)
  && noNull(props.answer.signedAt)
  && noUndefined(props.answer.signedAt),
)

const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const { raiseAnswer } = answerHook()
const { downloadAnswers } = downloadHook()
const { getEmployeeFullname } = employeeHook()
const responseMessage = ref<null | string>(null)
const isGreenMessage = ref(false)

const downloadFile = ref<AnchorHTMLAttributes & { click: () => undefined } | null>(null)

async function download(id: number) {
  IncLoading()

  const data = await downloadAnswers({
    answerIds: [id],
    eventName: props.eventName,
    employeeName: getEmployeeFullname(props.employee),
  })
  if (downloadFile.value && data) {
    downloadFile.value.href = `data:application/pdf;base64,${data.content}`
    downloadFile.value.download = data.fileName
    downloadFile.value.click()
  }
  DecLoading()
}

async function raise() {
  IncLoading()
  const response = await raiseAnswer(props.answer.id)
  if (response) {
    const { message, isSuccess } = response
    responseMessage.value = message || null
    isGreenMessage.value = isSuccess
  }
  DecLoading()
}
</script>
