<template>
<PageAuthWrapper>
  <PageAuthWrapper>
    <div class="h-full px-4 mt-4 sm:px-6 lg:px-8">
      <div class=" sm:flex-col lg:flex-row lg:items-center">
        <div class="w-full mb-4 sm:flex-auto">
          <input
            v-model="state.search"
            class="block w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md shadow-md appearance-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            :class="[{ 'cursor-not-allowed border-gray-500 bg-gray-200 opacity-40': uiStore.getUIIsLoading }]"
            type="text"
            placeholder="Recherchez"
            @keyup="searchEntity"
          >
        </div>

        <div class="flex items-center justify-between">
          <UserTableFilters @setFilter="setUserRoleFilter" />

          <BaseButton
            :is-loading="uiStore.getUIIsLoading"
            :disabled="uiStore.getUIIsLoading"
            @click="resetFilters"
          >
            Reset Filters
          </BaseButton>
        </div>
      </div>

      <BaseLoader
        v-if="uiStore.getUIIsLoading || !state.isDirty"
        class="mt-10"
      />

      <BaseTable v-else>
        <template #header>
          <UserTableHeader />
        </template>

        <template #default>
          <UserTableItem
            v-for="user in state.items"
            :key="user.id"
            :user="user"
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
</pageauthwrapper>
</template>

<script setup lang="ts">
import PageAuthWrapper from '~/components/Page/PageAuthWrapper.vue'
import BaseButton from '~/components/Base/BaseButton.vue'
import BasePagination from '~/components/Base/BasePagination.vue'
import BaseLoader from '~/components/Base/BaseLoader.vue'
import BaseTable from '~/components/Base/BaseTable.vue'
import UserTableItem from '~~/components/User/Table/Item.vue'
import UserTableHeader from '~~/components/User/Table/Header.vue'
import type { UserType } from '~~/store'
import { useUiStore } from '~~/store'
import type { RoleEnum } from '~/types'

const uiStore = useUiStore()

const { fetchMany } = companyHook()

async function fetchRelations(items: UserType[]) {
  if (items.length > 0) {
    await fetchMany(items.map(item => item.companyId))
  }
}

const {
  state,
  resetFilters,
  setFilter,
  searchEntity,
} = tableHook<UserType>('admin/user', fetchRelations)

function setUserRoleFilter(roles: RoleEnum | undefined) {
  if (roles) {
    setFilter({ roles })
  } else {
    state.filters = null
  }
}

definePageMeta({
  layout: 'auth',
  isAuth: true,
  isAdmin: true,
  middleware: ['guards-middleware'],
})
</script>
