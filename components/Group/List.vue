<template>
<div>
  list
</div>
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
