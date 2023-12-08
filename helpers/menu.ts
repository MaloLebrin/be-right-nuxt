import {
  ArchiveBoxIcon,
  BellAlertIcon,
  CalendarDaysIcon,
  HomeIcon,
  ListBulletIcon,
  PlusIcon,
  UserGroupIcon,
  UserMinusIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline'
import { RouteNames } from './routes'
import type { MenuItemContent } from '~/types/Menu'

export function findRecusivlyByLinkName(tree: MenuItemContent[], linkName: string) {
  for (const item of tree) {
    if (item?.linkName === linkName)
      return item

    if (item.children && item.children.length > 0) {
      return findRecusivlyByLinkName(item.children, linkName)
    }
  }
}

export const ADMIN_MENU_ITEMS: MenuItemContent[] = [
  {
    label: 'Dashboard',
    icon: HomeIcon,
    linkName: 'admin',
    isAdmin: true,
  },
  {
    label: 'Tous les événements',
    icon: CalendarDaysIcon,
    linkName: 'admin-events',
    isAdmin: true,
  },
  {
    label: 'Utilisateurs',
    icon: UserGroupIcon,
    linkName: 'admin-user',
    isAdmin: true,
  },
  {
    label: 'Destinataires',
    icon: UsersIcon,
    linkName: 'admin-destinataires',
    isAdmin: true,
  },
  {
    label: 'Créer un événement',
    icon: PlusIcon,
    linkName: RouteNames.CREATE_EVENT_STEP_1,
    isAdmin: true,
  },
]

export const MENU_ITEMS: MenuItemContent[] = [
  {
    label: 'Mes événements',
    icon: HomeIcon,
    isAdmin: false,
    children: [
      {
        label: 'Liste d\‘événements',
        icon: HomeIcon,
        linkName: 'evenement',
        isAdmin: false,
      },
      {
        label: 'Calendrier',
        icon: CalendarDaysIcon,
        linkName: RouteNames.EVENT_CALENDAR_MONTH_VIEW,
        isAdmin: false,
      },
      {
        label: 'Événements Archivés',
        icon: ArchiveBoxIcon,
        linkName: 'evenement-archives',
        isAdmin: false,
      },
      {
        label: 'Créer un événement',
        icon: PlusIcon,
        linkName: RouteNames.CREATE_EVENT_STEP_1,
        isAdmin: false,
      },
    ],
  },

  {
    label: 'Destinataires',
    icon: UsersIcon,
    isAdmin: false,
    children: [
      {
        label: 'Liste des Destinataires',
        icon: UsersIcon,
        linkName: 'destinataire',
        isAdmin: false,
      },
      {
        label: 'Destinataires supprimés',
        icon: UserMinusIcon,
        linkName: 'destinataire-supprimes',
        isAdmin: true,
      },
      {
        label: 'Créer un destinataire',
        icon: PlusIcon,
        linkName: RouteNames.EMPLOYEE_CREATE,
        isAdmin: false,
      },
    ],
  },

  {
    label: 'Groupes de diffusion',
    icon: ListBulletIcon,
    isAdmin: false,
    children: [
      {
        label: 'Liste des groupes',
        icon: ListBulletIcon,
        linkName: 'groupe',
        isAdmin: false,
      },
      {
        label: 'Créer un groupe de diffusion',
        icon: PlusIcon,
        linkName: 'groupe-creation',
        isAdmin: false,
      },
    ],
  },
  {
    label: 'Notifications',
    icon: BellAlertIcon,
    isAdmin: false,
    children: [
      {
        label: 'Liste des notifications',
        icon: ListBulletIcon,
        linkName: RouteNames.NOTIFICATIONS_LIST,
        isAdmin: false,
      },
      {
        label: 'Abonnement aux notifications',
        icon: BellAlertIcon,
        linkName: RouteNames.NOTIFICATIONS_SUBSCRIPTIONS,
        isAdmin: false,
      },
    ],
  },
]
