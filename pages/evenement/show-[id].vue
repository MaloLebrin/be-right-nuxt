<template>
<PageAuthWrapper>
  <EventDetails
    v-if="eventId"
    :event-id="eventId"
  />
</PageAuthWrapper>
</template>

<script setup lang="ts">
import PageAuthWrapper from '~/components/Page/PageAuthWrapper.vue'
import EventDetails from '~/components/Event/EventDetails.vue'
import { useEventStore, useUiStore } from '~~/store'

const eventStore = useEventStore()

const route = useRoute()

const eventId = route.name === 'evenement-show-id' && parseInt(route.params.id.toString())

useHead({
  title: eventStore.getOne(eventId)?.name || 'Voir événement',
})

onMounted(async () => {
  const uiStore = useUiStore()
  const { IncLoading, DecLoading } = uiStore

  const { fetchEventWithRelations } = eventHook()

  if (eventId) {
    IncLoading('Chargement de l\'événement')
    await fetchEventWithRelations(eventId)
    DecLoading()
  }
})

definePageMeta({
  layout: 'auth',
  isAuth: true,
  middleware: ['guards-middleware'],
})
</script>
