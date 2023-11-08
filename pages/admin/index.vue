<template>
<PageAuthWrapper>
  <div class="px-4 py-4 space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-base font-semibold leading-6 text-gray-900">
        Cette Année
      </h3>

      <BaseButton
        :disabled="uiStore.getUIIsLoading"
        @click="refresh"
      >
        Rafraichir
      </BaseButton>
    </div>

    <dl
      v-if="state"
      class="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <StatsAbstractCard
        :icon="CalendarDaysIcon"
        title="Événements"
        :count="state.events?.total || 0"
        link="admin-events"
      />
      <StatsAbstractCard
        :icon="ChatBubbleBottomCenterIcon"
        title="Réponses"
        :count="state.answers?.total || 0"
      />
      <StatsAbstractCard
        :icon="UsersIcon"
        title="Utilisateurs"
        :count="state.users?.total || 0"
        link="admin-user"
      />
    </dl>

    <TabGroup as="div">
      <TabList class="flex p-1 space-x-1 rounded-xl bg-blue-900/20">
        <Tab
          v-for="category in ['Événements', 'Réponses', 'Utilisateurs']"
          :key="category"
          v-slot="{ selected }"
          as="template"
        >
          <button
            class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            :class="[
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ category }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel
          v-for="(item, index) in Object.values(state)"
          :key="index"
          class="p-3 bg-white rounded-xl ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
        >
          <BaseLoader v-if="uiStore.getUIIsLoading" />
          <dl
            v-else-if="item"
            class="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3"
          >
            <div
              v-for="[key, value] in Object.entries(item)"
              :key="key"
              class="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6"
            >
              <dt class="text-sm font-medium text-gray-500 capitalize truncate">
                {{ key }}
              </dt>
              <dd class="flex items-baseline justify-between mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                <p>
                  {{ value }}
                  <span
                    v-if="key !== 'total'"
                    class="text-sm"
                  >/&nbsp;{{ item.total }}</span>
                </p>
                <span
                  v-if="key !== 'total'"
                  class="ml-2 text-sm font-semibold text-green-600"
                >
                  {{ Math.round((value * 100) / item.total) }}%
                </span>
              </dd>
            </div>
          </dl>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</PageAuthWrapper>
</template>

<script setup lang="ts">
import {
  CalendarDaysIcon,
  ChatBubbleBottomCenterIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline'
import StatsAbstractCard from '~~/components/Stats/StatsAbstractCard.vue'
import BaseButton from '~/components/Base/BaseButton.vue'
import BaseLoader from '~/components/Base/BaseLoader.vue'
import PageAuthWrapper from '~/components/Page/PageAuthWrapper.vue'
import { useUiStore } from '~/store'

const { $api, $toast } = useNuxtApp()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const state = reactive<Stats>({})

interface Stats {
  events?: {
    total: number
    completed: number
    closed: number
    created: number
    pending: number
  }
  answers?: {
    total: number
    refused: number
    accepted: number
    withoutResponse: number
  }
  users?: {
    total: number
    owners: number
    photographers: number
    users: number
  }
  companies?: {
    total: number
    premiums: number
    mediums: number
    basics: number
    noEvents: number
    noEmployee: number
  }
}

async function refresh() {
  IncLoading()
  const { data, success } = await $api().get<Stats>('admin/stats')

  if (!data || !success) {
    $toast.danger('Une erreur est survenue')
  }

  state.events = data?.events
  state.answers = data?.answers
  state.users = data?.users
  state.companies = data?.companies

  DecLoading()
}

onMounted(async () => {
  await refresh()
})

definePageMeta({
  layout: 'admin',
  isAuth: true,
  isAdmin: true,
  middleware: ['guards-middleware'],
})
</script>
