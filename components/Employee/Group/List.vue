<template>
<BaseTable>
  <template #header>
    <EmployeeGroupTableHeader />
  </template>
  <template #default>
    <EmployeeGroupTableItem
      v-for="group in groups"
      :key="group.id"
      :group="group"
    />
  </template>
</BaseTable>
</template>

<script setup lang="ts">
import type { Group } from '~~/store'

interface Props {
  groups: Group[]
}

withDefaults(defineProps<Props>(), {
  groups: () => [],
})
</script>
