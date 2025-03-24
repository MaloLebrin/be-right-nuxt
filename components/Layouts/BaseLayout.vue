<template>
<main class="flex min-h-screen">
  <MenuDrawer />
  <div class="w-full lg:ml-64">
    <HeaderDashboard />
    <slot />
  </div>
  <LayoutsGlobalLoader />
  <BaseToast
    :toasts="toasts"
    @remove="removeToast"
  />
  <slot name="modals" />
</main>

  
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'
import BaseToast from '~/components/Base/BaseToast.vue'
import LayoutsGlobalLoader from '~/components/Layouts/GlobalLoader.vue'
import MenuDrawer from '~/components/Menu/MenuDrawer.vue'
import HeaderDashboard from '~/components/Header/HeaderDashboard.vue'

const { toasts, removeToast } = useToast()
</script> 
