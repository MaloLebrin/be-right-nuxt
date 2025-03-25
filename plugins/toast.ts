export default defineNuxtPlugin(() => {
  const { toasts, removeToast, success, denied, info } = useToast()

  return {
    provide: {
      toast: {
        toasts,
        removeToast,
        success,
        denied,
        info,
      },
    },
  }
})
