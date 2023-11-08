import { useUiStore } from '~~/store'

export default defineNuxtRouteMiddleware(async to => {
  const userId = parseInt(to.params.id.toString())

  const uiStore = useUiStore()
  const { IncLoading, DecLoading } = uiStore

  const { fetchOne } = userHook()

  if (userId) {
    IncLoading()
    await fetchOne(userId)
    DecLoading()
  }
})
