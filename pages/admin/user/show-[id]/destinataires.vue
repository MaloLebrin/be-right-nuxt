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
        >
          <template #actions>
            <NuxtLink
              class="flex items-center px-3 py-3 text-sm text-purple-800 bg-purple-100 rounded-md group"
              :data-cy="`employee-${employee.id}-show-link`"
              :to="{
                name: RouteNames.ADMIN_EMPLOYEE_SHOW,
                params: {
                  id: employee.id,
                },
              }"
            >
              <PencilSquareIconOutline
                class="w-5 h-5 mr-2 text-violet-800"
                aria-hidden="true"
              />
              Voir
            </NuxtLink>
          </template>
        </EmployeeTableItem>
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
import type { EmployeeType } from '~~/store/employee/types'
import { useUiStore } from '~~/store'
import { RouteNames } from '~/helpers/routes'
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

const route = useRoute()

let defaultFilterValue = {}

if (route.query['andFilters[company.id]']) {
  defaultFilterValue = {
    andFilters: {
      'company.id': route.query['andFilters[company.id]']?.toString(),
    },
  }
}

const {
  resetFilters,
  searchEntity,
  state,
  updateLimit,
} = tableHook<EmployeeType>(
  'employee',
  undefined,
  defaultFilterValue,
)

definePageMeta({
  layout: 'admin-user',
  isAuth: true,
  isAdmin: true,
  middleware: ['guards-middleware', 'fetch-user-middleware'],
})
</script>
