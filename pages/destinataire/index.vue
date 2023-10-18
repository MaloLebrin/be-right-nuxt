<template>
<PageAuthWrapper>
  <EmployeeList />
</PageAuthWrapper>
</template>

<script setup lang="ts">
import {
  useCompanyStore,
  useEmployeeStore,
  useUiStore,
} from '~~/store'
import PageAuthWrapper from '~~/components/Page/PageAuthWrapper.vue'
import EmployeeList from '~~/components/Employee/EmployeeList.vue'

const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const employeeStore = useEmployeeStore()
const companyStore = useCompanyStore()

const { fetchMany: fetchManyEmployees } = employeeHook()

onMounted(async () => {
  IncLoading()
  if (companyStore.getAuthCompany && companyStore.getAuthCompany.employeeIds.length > 0) {
    const missingsEmployeeIds = companyStore.getAuthCompany.employeeIds.filter(id => !employeeStore.isAlreadyInStore(id))

    if (missingsEmployeeIds?.length > 0) {
      await fetchManyEmployees(missingsEmployeeIds)
    }
  }
  DecLoading()
})

definePageMeta({
  layout: 'auth',
  isAuth: true,
  middleware: 'guards-middleware',
})
</script>
