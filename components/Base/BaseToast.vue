<template>
<TransitionGroup
  name="toast"
  tag="div"
  class="fixed z-50 flex flex-col gap-2 top-4 right-4"
>
  <div
    v-for="toast in toasts"
    :key="toast.id"
    class="min-w-[300px] p-4 rounded-lg shadow-lg flex items-center gap-2"
    :class="{
      'bg-green-500 text-white': toast.type === 'success',
      'bg-red-500 text-white': toast.type === 'error',
      'bg-blue-500 text-white': toast.type === 'info'
    }"
  >
    <Icon
      :name="getIconName(toast.type)"
      class="w-5 h-5"
    />
    <span class="flex-1">{{ toast.message }}</span>
    <button
      class="hover:opacity-80"
      @click="removeToast(toast.id)"
    >
      <Icon
        name="heroicons:x-mark"
        class="w-5 h-5"
      />
    </button>
  </div>
</TransitionGroup>
</template>

<script setup lang="ts">
interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

const props = defineProps<{
  toasts: Toast[]
}>()

const emit = defineEmits<{
  (e: 'remove', id: number): void
}>()

const removeToast = (id: number) => {
  emit('remove', id)
}

const getIconName = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return 'heroicons:check-circle'
    case 'error':
      return 'heroicons:x-circle'
    case 'info':
      return 'heroicons:information-circle'
  }
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style> 
