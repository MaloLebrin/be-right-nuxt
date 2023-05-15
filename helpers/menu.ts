import {
  ArchiveBoxIcon,
  BellAlertIcon,
  HomeIcon,
  ListBulletIcon,
  PlusIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline'
import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'nuxt/dist/app/compat/capi'
import { RouteNames } from './routes'
import type { RoutesNamesList } from '~/.nuxt/typed-router/__routes'

interface MenuItem {
  label: string
  linkName: RoutesNamesList
  isAdmin?: boolean
  isAuth?: boolean
  icon: FunctionalComponent<HTMLAttributes & VNodeProps, {}, any>
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Événements',
    icon: HomeIcon,
    linkName: 'evenement',
    isAdmin: false,
  },
  {
    label: 'Événements Archivés',
    icon: ArchiveBoxIcon,
    linkName: 'evenement-archives',
    isAdmin: false,
  },
  {
    label: 'Destinataires',
    icon: UsersIcon,
    linkName: 'destinataire',
    isAdmin: false,
  },
  {
    label: 'Groupes de diffusion',
    icon: ListBulletIcon,
    linkName: 'groupe',
    isAdmin: false,
  },
  {
    label: 'Notifications',
    icon: BellAlertIcon,
    linkName: 'notifications',
    isAdmin: false,
  },
  {
    label: 'Créer un événement',
    icon: PlusIcon,
    linkName: RouteNames.CREATE_EVENT_STEP_1,
    isAdmin: false,
  },
  {
    label: 'Créer un destinataire',
    icon: PlusIcon,
    linkName: RouteNames.EMPLOYEE_CREATE,
    isAdmin: false,
  },
  {
    label: 'Créer un groupe de diffusion',
    icon: PlusIcon,
    linkName: 'groupe-creation',
    isAdmin: false,
  },
]
