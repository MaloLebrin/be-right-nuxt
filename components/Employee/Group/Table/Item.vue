<template>
<tr>
  <td class="py-4 text-sm font-medium text-gray-900 truncate whitespace-nowrap sm:pl-6">
    {{ group.id }}
  </td>
  <td class="py-4 pl-4 text-sm font-medium text-gray-900 truncate whitespace-nowrap">
    {{ group.name }}
  </td>
  <td class="relative py-4 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
    <BaseButton>
      <template #icon>
        <MinusCircleIconOutline class="w-5 h-5 text-red-500" />
      </template>
      Retirer du groupe
    </BaseButton>
  </td>
</tr>
</template>

<script setup lang="ts">
import type { Group } from '~~/store'

interface Props {
  group: Group
}

defineProps<Props>()
</script>
