import { hasOwnProperty } from '@antfu/utils'
import type { Badge } from '~~/store'
import { useBadgeStore, useUiStore } from '~~/store'

export default function badgeHook() {
  const { $api, $pinia } = useNuxtApp()

  const { IncLoading, DecLoading } = useUiStore($pinia)
  const badgeStore = useBadgeStore($pinia)
  const { addMany } = badgeStore

  function areBadgeTypes(args: unknown[]) {
    return args.every(arg =>
      hasOwnProperty(arg, 'name')
      && hasOwnProperty(arg, 'slug')
      && hasOwnProperty(arg, 'label'),
    )
  }

  async function fetchAll() {
    IncLoading()
    const { data: badges } = await $api().get<Badge[]>('badges')
    if (badges && areBadgeTypes(badges)) {
      addMany(badges.filter(badge => !badgeStore.isAlreadyInStore(badge.id)))
    }
    DecLoading()
  }

  return {
    fetchAll,
  }
}
