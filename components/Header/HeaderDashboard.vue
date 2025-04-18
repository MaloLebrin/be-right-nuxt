<template>
<div class="sticky top-0 z-10 flex items-center justify-between flex-shrink-0 w-full h-16 bg-white border-b border-gray-200 dark:border-0 drop-shadow">
  <div class="flex items-center ml-2 space-x-4">
    <div class="flex flex-col flex-1">
      <div class="sticky top-0 z-10 pt-1 pl-1 lg:hidden sm:pl-3 sm:pt-3">
        <button
          type="button"
          class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          data-cy="open-drawer-mobile"
          @click="toggleDrawer"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon
            class="w-6 h-6"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>

    <a
      data-cy="go-back-button"
      class="items-center hidden space-x-2 text-gray-500 cursor-pointer md:flex hover:underline"
      @click="goBack"
    >
      <ChevronLeftIcon class="w-5 h-5" />
      <span>Retour</span>
    </a>
    <h3 class="flex items-center space-x-4 text-sm font-semibold text-gray-800 text-normal md:text-xl ">
      <template v-if="getRouteHeaderContent && $isNotMobile">
        <component
          :is="getRouteHeaderContent.icon"
          class="h-6 rounded-lg dark:bg-red"
        />
        <span>{{ getRouteHeaderContent.label }}</span>
      </template>
      <span v-else-if="getOutsideMenuRouteLabel">{{ getOutsideMenuRouteLabel }}</span>
    </h3>
  </div>

  <div class="flex items-center">
    <BaseLoadingIndicator
      :is-loading="uiStore.getUIIsLoading"
      :message="uiStore.loadingMessage"
    />
    <NotificationMenu is-in-header />

    <UserMenu
      is-in-header
      class="lg:hidden"
      data-cy="user-menu-in-header"
    />
  </div>
</div>
</template>

<script setup lang="ts">
import { Bars3Icon, ChevronLeftIcon } from '@heroicons/vue/24/outline'
import UserMenu from '~/components/User/UserMenu.vue'
import { MENU_ITEMS, findRecusivlyByLinkName } from '~~/helpers/menu'
import NotificationMenu from '~/components/Notification/NotificationMenu.vue'
import { RouteNames } from '~~/helpers/routes'
import { useUiStore } from '~~/store'

const router = useRouter()
const route = useRoute()
const { toggleDrawer } = useUiStore()

const { $isNotMobile } = useNuxtApp()

const getRouteHeaderContent = computed(() =>
  findRecusivlyByLinkName(MENU_ITEMS, route.name),
)

const uiStore = useUiStore()

const getOutsideMenuRouteLabel = computed(() => {
  if (route.name) {
    const formatedRouteName = route.name.toString().split('.').splice(1).join('.')

    switch (formatedRouteName || route.name) {
      case RouteNames.SHOW_EVENT_ID:
        return 'Détail de l\'événement'
      case 'evenement-edit-id':
        return 'Modifier l\'événement'
      case 'evenement-archives':
        return 'Événements supprimés'
      case RouteNames.CREATE_EVENT_STEP_1:
        return 'Créer un événement'

      case 'groupe-creation':
        return 'Créer un groupe'

      case RouteNames.ADMIN_USER_SHOW_ACCOUNT:
        return 'Détail de l\'utilisateur'
      case 'user-edit-id':
        return 'Modifier l\'utilisateur'

      case 'destinataire-show-id':
        return 'Détail du destinataire'
      case 'destinataire-create':
        return 'Créer un destinataire'
      case 'destinataire-edit-id':
        return 'Modifier le destinataire'

      case 'mon-compte-notifications':
        return 'Gestion des notifications'
      case 'mon-compte-parametre':
        return 'Gestion des paramètres'
      case 'mon-compte-plan-billing':
        return 'Abonnement et facturation'
      case 'mon-compte-utilisateurs':
        return 'Gestions des comptes utilisateurs'

      case 'addresse-create':
        return 'Ajouter une adresse'
      case 'addresse-edit-id':
        return 'Modifier l\'adresse'
      case 'address-show-id':
        return 'Voir l\'adresse'

      case RouteNames.EVENT_CALENDAR_MONTH_VIEW:
        return 'Calendrier Vue Mois'
      case RouteNames.EVENT_CALENDAR_WEEK_VIEW:
        return 'Calendrier Vue Semaine'

      case RouteNames.NOTIFICATIONS_LIST:
        return 'Notifications'

      case RouteNames.NOTIFICATIONS_SUBSCRIPTIONS:
        return 'Abonnements aux notifications'
    }
  }
  return null
})

function goBack() {
  router.back()
}
</script>
