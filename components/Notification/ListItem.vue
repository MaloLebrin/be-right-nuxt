<template>
<MenuItem
  as="div"
>
  <div class="flex justify-between w-full p-2">
    <div class="flex items-center">
      <div
        class="w-2 h-2 mr-2 rounded-full"
        :class="{ 'bg-purple-500': !notification.readAt }"
      />
      <div>
        <p class="text-sm">
          {{ notification.title }}
        </p>
        <p class="mt-1 text-xs text-gray-400 font-font-extralight">
          {{ getDateDisplayedNotification(notification) }}
        </p>
      </div>
    </div>

    <NotificationActionButton
      :event-id="getEventIdNotif"
      :notification="notification"
    />
  </div>
</MenuItem>
</template>

<script setup lang="ts">
import type { NotificationType } from '~~/store'
import NotificationActionButton from '~~/components/Notification/ActionButton.vue'
import { useAnswerStore } from '~~/store'

interface Props {
  notification: NotificationType
}

const props = defineProps<Props>()

const {
  getDateDisplayedNotification,
} = notificationHook()

const answerStore = useAnswerStore()

const getEventIdNotif = computed(() => {
  let eventId: undefined | null | number
  if (props.notification?.eventNotification?.eventId) {
    eventId = props.notification?.eventNotification?.eventId
  }
  if (props.notification?.eventNotification?.answerId) {
    const answer = answerStore.getOne(props.notification?.eventNotification?.answerId)
    eventId = answer?.eventId
  }

  return eventId
})
</script>
