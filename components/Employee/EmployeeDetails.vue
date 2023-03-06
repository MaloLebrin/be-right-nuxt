<template>
<main class="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
  <EmployeeDetailProfile :employee="employee" />
  <div
    v-if="employeeEvents.length > 0"
    class="px-8"
  >
    <EmployeeEventList :events="employeeEvents" />
  </div>
</main>
</template>

<script setup lang="ts">
import type { EmployeeType } from '@/types'
import {
  useEventStore,
} from '~~/store'

interface Props {
  employee: EmployeeType | null
}

const props = defineProps<Props>()

const eventStore = useEventStore()
const employeeEvents = computed(() =>
  props.employee ? eventStore.getAllByEmployee(props.employee?.id) : [])
</script>
