<template>
<PageAuthWrapper>
  <div class="flex px-4 mx-auto mb-8 lg:px-8">
    <EmployeeForm has-suggestion />
  </div>
</PageAuthWrapper>
</template>

<script setup lang="ts">
import EmployeeForm from '~/components/Employee/EmployeeForm.vue'
import PageAuthWrapper from '~/components/Page/PageAuthWrapper.vue'

definePageMeta({
  layout: 'auth',
  isAuth: true,
  middleware: 'guards-middleware',
})
</script>
