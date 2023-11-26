<template>
<div
  class="w-full h-2 rounded-md"
  :class="getProgressBarBGColor()"
  :title="`${answers.filter(answer => noNullUndefined(answer.signedAt)).length} / ${answers.length} traitées`"
>
  <div
    class="h-2 rounded-md"
    :class="[getProgressBarContentColor()]"
    :style="{ width: `${getProgressBarWidth()}%` }"
  />
</div>
</template>

<script setup lang="ts">
import { type AnswerType, EventStatusEnum } from '~~/store'

interface Props {
  status: EventStatusEnum
  answers: AnswerType[]
}

const props = defineProps<Props>()

function getProgressBarBGColor() {
  switch (props.status) {
    case EventStatusEnum.PENDING:
      return 'bg-orange-200'
    case EventStatusEnum.CREATE:
      return 'bg-transparent'
    case EventStatusEnum.CLOSED:
      return 'bg-lime-200'
    case EventStatusEnum.COMPLETED:
      return 'bg-green-200'
    default:
      return 'bg-transparent'
  }
}

function getProgressBarContentColor() {
  switch (props.status) {
    case EventStatusEnum.PENDING:
      return 'bg-orange-500'
    case EventStatusEnum.CREATE:
      return 'bg-transparent'
    case EventStatusEnum.CLOSED:
      return 'bg-lime-500'
    case EventStatusEnum.COMPLETED:
      return 'bg-green-500'
    default:
      return 'bg-transparent'
  }
}

function getProgressBarWidth() {
  return (props.answers.filter(answer => noNullUndefined(answer.signedAt)).length * 100) / props.answers?.length
}
</script>
