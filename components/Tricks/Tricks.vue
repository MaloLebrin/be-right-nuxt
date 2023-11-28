<template>
<div
  v-if="data"
  class="relative hidden p-2 mt-4 text-xs border rounded-md md:block bg-amber-100 border-amber-400"
>
  <div class="flex items-center justify-between mb-2">
    <p class="font-semibold ">
      {{ data.title }}
    </p>
    <button
      class="w-4 h-4 text-amber-500"
      @click="refresh()"
    >
      <LightBulbIcon />
    </button>
  </div>
  <p class="font-light ">
    {{ data.description }}
  </p>
</div>
</template>

<script setup lang="ts">
import { LightBulbIcon } from '@heroicons/vue/20/solid'
import type { Trick } from '~~/types/Tricks'

const { data, refresh } = await useFetch<Trick>('api/tricks/randomly')
</script>
