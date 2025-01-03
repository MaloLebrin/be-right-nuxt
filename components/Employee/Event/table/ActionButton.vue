<template>
<Menu
  as="div"
  class="relative inline-block text-left"
>
  <div>
    <MenuButton
      :data-cy="`event-${props.event.id}-options-links`"
      class="inline-flex justify-center w-full px-2 py-1 text-sm font-medium text-purple-500 bg-purple-300 border border-purple-500 rounded-md bg-opacity-20 hover:bg-opacity-40 hover:text-purple-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      Options
      <ChevronDownIcon
        class="w-5 h-5 ml-1 -mr-1 text-purple-500 hover:text-purple-800"
        aria-hidden="true"
      />
    </MenuButton>
    <a
      ref="downloadFiles"
    />
  </div>

  <MenuItems
    class="absolute right-0 z-10 w-56 mt-2 overflow-visible origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
  >
    <div class="px-1 py-1">
      <MenuItem>
        <NuxtLink
          class="flex items-center w-full px-2 py-2 text-sm rounded-md group"
          :to="{ name: RouteNames.SHOW_EVENT_ID, params: { id: event.id } }"
        >
          <PencilSquareIcon
            class="w-5 h-5 mr-2 text-gray-800"
            aria-hidden="true"
          />
          Voir
        </NuxtLink>
      </MenuItem>
      <MenuItem v-if="answer">
        <button
          class="flex items-center w-full px-2 py-2 text-sm rounded-md group"
          :class="{ isDowloadDisabled: 'cursor-not-allowed opacity-50' }"
          :disabled="isDowloadDisabled"
          @click="download(answer.id)"
        >
          <ArrowDownTrayIcon
            class="w-5 h-5 mr-2 text-gray-800"
            aria-hidden="true"
          />
          Télécharger
        </button>
      </MenuItem>
    </div>
  </MenuItems>
</Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ArrowDownTrayIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import type { AnchorHTMLAttributes } from 'vue'
import { RouteNames } from '~~/helpers/routes'
import type { EventType } from '~~/types'
import { useAnswerStore, useUiStore } from '~~/store'

interface Props {
  event: EventType
  employeeId: number
}

const props = defineProps<Props>()
const answerStore = useAnswerStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore

const answer = computed(() => answerStore.getAllArray.find(answer =>
  answer.eventId === props.event.id && answer.employeeId === props.employeeId),
)

const isDowloadDisabled = computed(() => !answer.value || !answer.value?.signedAt)
const downloadFiles = ref<AnchorHTMLAttributes & { click: () => undefined } | null>(null)

const { downloadAnswers } = downloadHook()

async function download(id: number) {
  IncLoading()

  const data = await downloadAnswers({
    answerIds: [id],
    eventName: props.event.name,
  })
  if (downloadFiles.value && data) {
    downloadFiles.value.href = `data:application/pdf;base64,${data.content}`
    downloadFiles.value.download = data.fileName
    downloadFiles.value.click()
  }
  DecLoading()
}
</script>
