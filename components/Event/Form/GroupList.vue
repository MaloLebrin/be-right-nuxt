<template>
<ul class="px-4 py-4 space-y-2 divide-y-2">
  <li v-if="groupStore.getIsEmpty">
    Aucune liste
  </li>
  <template v-else>
    <li
      v-for="group in groupStore.getNotEmptyGroups"
      :key="group.id"
      class="relative py-2 space-x-2"
    >
      <label :id="`${group.name}-${group.id}`">
        <input
          type="checkbox"
          :disabled="uiStore.getUIIsLoading"
          :aria-labelledby="`${group.name}-${group.id}`"
          class="w-4 h-4 -mt-2 text-indigo-600 border-gray-300 rounded left-4 focus:ring-indigo-600"
          :checked="allEmployeeGroupSelected(group).value"
          @change="toggleAllFromGroup(group)"
        >

        <span class="ml-2">{{ group.name }}</span>
      </label>
    </li>
  </template>
</ul>
</template>

<script setup lang="ts">
import type { Group } from '~/store'
import { useFormStore, useGroupStore, useUiStore } from '~/store'

const groupStore = useGroupStore()
const uiStore = useUiStore()
const formStore = useFormStore()
const { mergeEmployeeIds, removeEmployeeIds } = formStore

const allEmployeeGroupSelected = (group: Group) => computed(() => group.employeeIds.every(id => formStore.getEmployeeIds.includes(id)))

function toggleAllFromGroup(group: Group) {
  if (allEmployeeGroupSelected(group).value) {
    removeEmployeeIds(group.employeeIds)
  } else {
    mergeEmployeeIds(group.employeeIds)
  }
}
</script>
