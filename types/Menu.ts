import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'nuxt/dist/app/compat/capi'

export interface MenuItemContent {
  label: string
  linkName?: string
  icon: FunctionalComponent<HTMLAttributes & VNodeProps, {}, any>
  children?: MenuItemContent[]
  isAdmin?: boolean
}
