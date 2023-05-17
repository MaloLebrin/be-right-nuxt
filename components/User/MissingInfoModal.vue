<template>
<BaseModal
  :is-active="isActive"
  @close="close"
>
  <div class="px-4 py-2 sm:flex sm:items-start">
    <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-blue-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
      <ExclamationTriangleIconOutline
        class="w-6 h-6 text-blue-600"
        aria-hidden="true"
      />
    </div>
    <div class="mt-3 space-y-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
      <DialogTitle
        as="h3"
        class="text-lg font-medium leading-6 text-gray-900"
      >
        Des informations sont manquantes sur votre compte.
      </DialogTitle>
      <div class="flex flex-col mt-2 space-y-4">
        <p>Plusieurs informations n'ont pas été complétées sur votre compte&nbsp;: </p>
        <ul class="w-full space-y-2 list-disc">
          <li
            v-for="(info, index) in missingInfos"
            :key="index"
            class="flex items-center justify-between"
          >
            <span>-&nbsp;{{ info.label }}</span>
            <NuxtLink
              class="text-indigo-500 underline"
              :to="{ name: info.link.name }"
              @click="close"
            >
              Voir
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</BaseModal>
</template>

<script setup lang="ts">
import type { MissingInfos } from '~/store/company/types'

interface Props {
  isActive: boolean
  missingInfos: MissingInfos[]
}

withDefaults(defineProps<Props>(), {
  isActive: false,
  missingInfos: () => [],
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

function close() {
  emit('close')
}
</script>
