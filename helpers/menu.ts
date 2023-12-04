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

export const ADMIN_MENU_ITEMS = [
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

export const MENU_ITEMS = [
  {
    label: 'Mes événements',
    icon: HomeIcon,
    linkName: 'evenement',
    isAdmin: false,
    children: [
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
    linkName: 'destinataire',
    isAdmin: false,
    children: [
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
    linkName: 'groupe',
    isAdmin: false,
    children: [
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
    linkName: 'notifications',
    isAdmin: false,
  },
]
