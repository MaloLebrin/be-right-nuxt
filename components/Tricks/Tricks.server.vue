<template>
<div
  v-if="data.value"
  class="relative hidden p-2 mx-2 mt-4 text-xs bg-opacity-50 border rounded-md md:block bg-amber-200 border-amber-300"
>
  <div class="flex justify-between mb-2">
    <p class="font-semibold max-w-3/4">
      {{ data.value.title }}
    </p>
    <button
      class="w-4 h-4 text-amber-500"
      @click="refresh()"
    >
      <LightBulbIcon />
    </button>
  </div>
  <p class="font-light ">
    {{ data.value.description }}
  </p>
</div>
</template>

<script setup lang="ts">
import { LightBulbIcon } from '@heroicons/vue/20/solid'
import type { Trick } from '~~/types/Tricks'

const { data, refresh } = await useFetch<Trick>('api/tricks/randomly')
</script>
