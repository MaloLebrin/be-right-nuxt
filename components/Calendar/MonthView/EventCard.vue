<template>
<Popover
  as="div"
  class="relative"
>
  <PopoverButton
    class="flex group"
  >
    <p class="flex-auto font-medium text-gray-900 truncate group-hover:text-indigo-600">
      {{ event.name }}
    </p>
    <time
      :datetime="event.start as unknown as string"
      class="flex-none hidden ml-3 text-gray-500 group-hover:text-indigo-600 xl:block"
    >{{ $toFormat(event.start, 'DD MM') }} - {{ $toFormat(event.end, 'DD MM') }}</time>
  </PopoverButton>

  <transition
    enter-active-class="transition ease-out duration-800"
    enter-from-class="translate-y-1 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition ease-in duration-250"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-1 opacity-0"
  >
    <PopoverPanel class="absolute z-10 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
      <div class="no-scroll-bar relative mx-5 mt-4 min-w-[315px] max-w[315px] bg-slate-200 overflow-y-scroll rounded-2xl bg-opacity-50 shadow-lg backdrop-blur">
        <div class="flex items-center justify-between px-6 py-4 mb-2 space-y-1">
          <div class="overflow-hidden">
            <h4 class="overflow-hidden text-lg text">
              {{ event.name }}
            </h4>
            <time
              :datetime="event.start as unknown as string"
              class="text-xs font-thin"
            >
              {{ $toFormat(event.start, 'DD/MM/YY') }} - {{ $toFormat(event.end, 'DD/MM/YY') }}
            </time>
          </div>
          <NuxtLink
            :to="{ name: RouteNames.SHOW_EVENT_ID, params: { id: event.id } }"
            class="rounded-md bg-indigo-500 px-3 py-1.5 text-white"
          >
            Voir
          </NuxtLink>
        </div>

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
      </div>
    </PopoverPanel>
  </transition>
</Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/vue/20/solid'
import { type AnswerType, type EventType, useEmployeeStore } from '~~/store'
import { RouteNames } from '~~/helpers/routes'
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

<style scoped>
.no-scroll-bar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scroll-bar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
