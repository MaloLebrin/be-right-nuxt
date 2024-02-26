export interface MenuItemContent {
  label: string
  linkName?: string
  icon: any
  children?: MenuItemContent[]
  isAdmin?: boolean
}
