import { parseBoolean } from '~~/utils/basics'
import { useAuthStore } from '~/store'
import { useUiStore } from '~/store/ui'
import type { TableHookState } from '~/types/TableHookTypes'
import type { PaginatedResponse } from '~/types/globals'

export default function tableHook<T>(baseUrl: string, onFetched?: ((items: T[]) => Promise<void>), defaultState?: Partial<TableHookState<T>>) {
  const { $api, $router } = useNuxtApp()
  const uiStore = useUiStore()
  const { DecLoading, IncLoading } = uiStore
  const authStore = useAuthStore()

  const query = ref('')

  const state = reactive<TableHookState<T>>({
    isDirty: false,
    search: defaultState?.search || '',
    timeout: 0,
    items: [],
    currentPage: 1,
    limit: 20,
    total: 0,
    filters: defaultState?.filters || null,
    andFilters: defaultState?.andFilters || null,
    totalPages: 0,
    order: defaultState?.order || null,
    withDeleted: defaultState?.withDeleted || false,
  })

  onMounted(() => {
    fetchTable()
    // Only watch when mounted to give consumers a chance to change defaults, add filters etc.
    watch(() => [$router.currentRoute.value.query], async () => {
      await fetchTable()
    }, { deep: true })

    // Watch filters separately
    watch(() => state.filters, async () => {
      await fetchTable()
    }, { deep: true })
  })

  async function fetchTable() {
    IncLoading()
    if (authStore.getIsLoggedIn) {
      if (!state.isDirty) {
        state.isDirty = true
      }

      const currentRoute = $router.currentRoute.value
      if (currentRoute.query) {
        state.currentPage = parseInt(currentRoute.query?.page?.toString() || state.currentPage.toString())
        state.limit = parseInt(currentRoute.query?.limit?.toString() || state.limit.toString())
        state.search = currentRoute.query?.search?.toString() || ''
        state.withDeleted = parseBoolean(currentRoute.query?.withDeleted?.toString() || 'false') || false
      }

      let url = `${baseUrl}/?limit=${state.limit}&page=${state.currentPage}`

      if (state.search) {
        url += `&search=${state.search}`
      }

      if (currentRoute.query?.filters) {
        url += `&${currentRoute.query.filters}`
      }

      if (currentRoute.query?.andFilters) {
        url += `&${currentRoute.query.andFilters}`
      }

      if (state.filters) {
        url += `&${composeFilter(state.filters, 'filters')}`
      }

      if (state.andFilters) {
        url += `&${composeFilter(state.andFilters, 'andFilters')}`
      }

      if (state.withDeleted) {
        url += '&withDeleted=true'
      }

      const { data } = await $api().get<PaginatedResponse<T>>(url)

      if (data) {
        const { currentPage, data: items, limit, total, totalPages, order } = data
        state.currentPage = currentPage || 0
        state.items = items as any[]
        state.limit = limit || 20
        state.total = total || 0
        state.totalPages = totalPages || 0
        state.order = order

        if (onFetched) {
          await onFetched(state.items as T[])
        }
      }
    }
    DecLoading()
  }

  function resetFilters() {
    state.filters = null
    $router.push({
      name: $router.currentRoute.value.name!,
      query: {
        page: 1,
        search: '',
        limit: 20,
      },
    })
  }

  function setFilter(value: Record<string, string | string[]>) {
    state.filters = value
  }

  function searchEntity() {
    clearTimeout(state.timeout)
    state.timeout = window.setTimeout(() => {
      query.value = state.search
      $router.push({
        name: $router.currentRoute.value.name!,
        query: {
          ...$router.currentRoute.value.query,
          search: query.value,
        },
      })
    }, 500)
  }

  function udpateWithDeleted(withDeleted: boolean) {
    $router.push({
      name: $router.currentRoute.value.name!,
      query: {
        ...$router.currentRoute.value.query,
        withDeleted: withDeleted.toString(),
      },
    })
  }

  function updateLimit(limit: number) {
    $router.push({
      name: $router.currentRoute.value.name!,
      query: {
        ...$router.currentRoute.value.query,
        limit,
      },
    })
  }

  function resetState() {
    state.isDirty = false
    state.search = ''
    state.timeout = 0
    state.items = []
    state.currentPage = 1
    state.limit = 20
    state.total = 0
    state.filters = null
    state.totalPages = 0
    state.order = null
  }

  function composeFilter(filterParams: Record<string, string | string[]>, filterType: 'filters' | 'andFilters') {
    return Object.keys(filterParams)
      .map(field => {
        let value = filterParams![field]

        if (Array.isArray(value)) {
          value = value.join(',')
        }
        // Don't create empty filters.
        if (value.length) {
          return `${filterType}[${field}]=${value}`
        }
        return null
      })
      .filter((filter: string | null) => filter !== null)
      .join('&')
  }

  onUnmounted(() => {
    resetState()
  })

  return {
    fetchTable,
    query,
    resetFilters,
    resetState,
    searchEntity,
    setFilter,
    state,
    updateLimit,
    udpateWithDeleted,
  }
}
