export default defineNuxtPlugin(() => {
  const { toasts, removeToast, success, denied, info, warning } = useToast()

  return {
    provide: {
      toast: {
        toasts,
        removeToast,
        success,
        denied,
        warning,
        danger: denied,
        info,
      },
    },
  }
})
