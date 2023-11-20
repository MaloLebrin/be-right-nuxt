<template>
<div class="relative px-6 mb-4">
  <EventProgressBar
    :status="event.status"
    :answers="answers"
  />
</div>

<ol class="px-6 py-2 space-y-2">
  <template v-if="employees.length === 0">
    <li class="flex items-center">
      <p>Aucun destinataire</p>
    </li>
  </template>
  <template v-else>
    <li
      v-for="employe in employees"
      :key="employe.id"
      class="flex items-center justify-between space-x-2"
    >
      <p>{{ getEmployeeFullname(employe) }}</p>
      <template v-if="getAnswer(employe.id)">
        <p
          v-if="!getAnswer(employe.id)?.signedAt"
          class="flex items-center text-gray-500"
        >
          <ClockIcon
            class="flex-shrink-0 mr-1.5 h-5 w-5 text-amber-400"
            aria-hidden="true"
          />
          <span>En attente</span>
        </p>
        <p
          v-else-if="!getAnswer(employe.id)?.hasSigned"
          class="flex items-center text-gray-500"
        >
          <XCircleIcon
            class="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400"
            aria-hidden="true"
          />
          <span>Refusé le {{ $toFormat(getAnswer(employe.id)?.signedAt!, 'DD/MM/YY') }}</span>
        </p>

        <p
          v-else
          class="flex items-center text-gray-500"
        >
          <CheckCircleIcon
            class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
            aria-hidden="true"
          />
          <span>Signé le {{ $toFormat(getAnswer(employe.id)?.signedAt!, 'DD/MM/YY') }}</span>
        </p>
      </template>
    </li>
  </template>
</ol>
</template>

<script setup lang="ts">
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/vue/20/solid'
import { type AnswerType, type EventType, useEmployeeStore } from '~~/store'
import EventProgressBar from '~~/components/Event/EventProgressBar.vue'

interface Props {
  event: EventType
  answers: AnswerType[]
}

const props = defineProps<Props>()

const employeeStore = useEmployeeStore()
const { getEmployeeFullname } = employeeHook()

const employees = computed(() => employeeStore.getMany(props.answers.map(answer => answer.employeeId)))

function getAnswer(employeeId: number) {
  return props.answers.find(answer => answer.employeeId === employeeId)
}
</script>
