<template>
<NuxtLink
  :to="{ name: RouteNames.SHOW_GROUP_ID, params: { id: group.id } }"
  class="flex items-center justify-between px-2 py-2 space-x-2 border border-separate border-indigo-200 rounded-md"
>
  <span class="w-2/3 truncate">{{ group.name }}</span>
  <p>
    {{ group.employeeIds.length }}/<span class="text-xs font-light text-gray-500">pers.</span>
  </p>
</NuxtLink>
</template>

<script setup lang="ts">
import type { Group } from '~~/store'
import { RouteNames } from '~~/helpers/routes'

interface Props {
  group: Group
}

defineProps<Props>()
</script>
