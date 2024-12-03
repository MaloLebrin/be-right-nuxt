export default defineNuxtRouteMiddleware(async to => {
  const sessionId = to.params.sessionId.toString()

  const { getCheckoutSession } = stripeSessionHook()
  if (sessionId) {
    await getCheckoutSession(sessionId)
  }
})
