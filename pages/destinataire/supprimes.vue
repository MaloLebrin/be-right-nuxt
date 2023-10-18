<template>
<PageAuthWrapper>
  <div class="h-full px-4 my-4 sm:px-6 lg:px-8">
    <div class="flex items-start space-x-2">
      <BaseInputSearch
        id="employee-search"
        v-model="state.search"
        @update:search-query="searchEntity"
      />
      <BaseButton @click="resetFilters">
        Reset
      </BaseButton>
      <BaseLimitSelector
        :default-limit="state.limit"
        @update:limit="updateLimit"
      />
    </div>

    <BaseLoader
      v-if="uiStore.getUIIsLoading || !state.isDirty"
      class="mt-10"
    />

    <BaseTable v-else>
      <template #header>
        <EmployeeTableHeader />
      </template>

      <template #default>
        <EmployeeTableItem
          v-for="employee in state.items"
          :key="employee.id"
          :employee="employee"
        />
      </template>

      <template #footer>
        <BasePagination
          :total-pages="state.totalPages"
          :current-page="state.currentPage"
        />
      </template>
    </BaseTable>
  </div>
</PageAuthWrapper>
</template>

<script setup lang="ts">
import type { EmployeeType } from '~~/store'
import {
  // useCompanyStore,
  // useEmployeeStore,
  useUiStore,
} from '~~/store'
import PageAuthWrapper from '~~/components/Page/PageAuthWrapper.vue'
import BasePagination from '~/components/Base/BasePagination.vue'
import BaseLoader from '~/components/Base/BaseLoader.vue'
import BaseTable from '~/components/Base/BaseTable.vue'
import EmployeeTableItem from '~~/components/Employee/Table/Item.vue'
import EmployeeTableHeader from '~~/components/Employee/Table/Header.vue'
import BaseInputSearch from '~/components/Base/BaseInputSearch.vue'
import BaseButton from '~/components/Base/BaseButton.vue'
import BaseLimitSelector from '~/components/Base/BaseLimitSelector.vue'

const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
// const employeeStore = useEmployeeStore()
// const companyStore = useCompanyStore()

// const { fetchMany: fetchManyEmployees } = employeeHook()

const {
  resetFilters,
  searchEntity,
  state,
  updateLimit,
  udpateWithDeleted,
} = tableHook<EmployeeType>('employee')

onMounted(async () => {
  IncLoading()
  udpateWithDeleted(true)
  DecLoading()
})

definePageMeta({
  layout: 'auth',
  isAuth: true,
  middleware: 'guards-middleware',
})
</script>
