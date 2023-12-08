<template>
<BaseTable class="hidden md:inline-table">
  <template #header>
    <EmployeeEventTableHeader />
  </template>
  <template #default>
    <div
      v-if="events.length <= 0"
      class="flex items-center py-4 pl-4 pr-3 space-x-2 text-sm font-medium text-gray-900 truncate whitespace-nowrap sm:pl-6"
    >
      <p>{{ noEventMessage }}</p>
    </div>

    <EmployeeEventTableItem
      v-for="event in sortedEvents"
      v-else
      :key="event.id"
      :event="event"
      :employee-id="employeeId"
    />
  </template>
</BaseTable>
<ul class="space-y-2 md:hidden">
  <li
    v-for="event in events"
    :key="event.id"
  >
    <EventItemMobile :event="event" />
  </li>
</ul>
</template>

<script setup lang="ts">
import type { EventType } from '~~/types'
import BaseTable from '~/components/Base/BaseTable.vue'
import EmployeeEventTableItem from '~~/components/Employee/Event/table/Item.vue'
import EmployeeEventTableHeader from '~~/components/Employee/Event/table/Header.vue'
import EventItemMobile from '~/components/Event/EventItemMobile.vue'

interface Props {
  noEventMessage?: string
  events: EventType[]
  employeeId: number
}

const props = withDefaults(defineProps<Props>(), {
  noEventMessage: 'Aucun événement',
  events: () => [],
})
const { isBefore } = dateHook()

const sortedEvents = computed(() => [...props.events]
  .sort((a, b) => isBefore(a.start, b.start) ? 1 : isBefore(a.start, b.start) ? -1 : -2),
)
</script>
