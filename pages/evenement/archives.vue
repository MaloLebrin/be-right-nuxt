<template>
<PageAuthWrapper>
  <EventList
    v-if="$isNotMobile"
    :events="events"
  />

  <ul
    v-else
    class="mt-4 space-y-2"
  >
    <template v-if="events.length > 0">
      <EventItemMobile
        v-for="event in events"
        :key="event.id"
        :event="event"
      />
    </template>
    <BaseLoader v-else-if="uiStore.getUIIsLoading" />

    <BaseMessage
      v-else
      class="mx-2"
    >
      <div class="flex flex-col space-y-2">
        <p>Aucun Message archivé</p>
        <BaseButton @click="$router.go(-1)">
          Retour
        </BaseButton>
      </div>
    </BaseMessage>
  </ul>
</PageAuthWrapper>
</template>

<script setup lang="ts">
import BaseMessage from '~/components/Base/BaseMessage.vue'
import BaseLoader from '~/components/Base/BaseLoader.vue'
import PageAuthWrapper from '~/components/Page/PageAuthWrapper.vue'
import BaseButton from '~/components/Base/BaseButton.vue'
import {
  useEventStore,
  useUiStore,
  useUserStore,
} from '~~/store'

const eventStore = useEventStore()
const userStore = useUserStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore
const { fetchDeleted } = eventHook()
const { $isNotMobile, $router } = useNuxtApp()

const events = computed(() =>
  eventStore.getAllSorted(true),
)

onMounted(async () => {
  const userId = userStore.getAuthUserId

  IncLoading()
  if (userId) {
    await fetchDeleted()
  }
  DecLoading()
})

definePageMeta({
  layout: 'auth',
  isAuth: true,
  middleware: 'guards-middleware',
})
</script>
