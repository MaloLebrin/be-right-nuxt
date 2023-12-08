export enum RouteNames {
  // EVENTS
  CREATE_EVENT_STEP_1 = 'evenement-creer',
  CREATE_EVENT_STEP_2 = 'evenement-creer-step2',
  CREATE_EVENT_STEP_3 = 'evenement-creer-step3',
  CREATE_EVENT_STEP_PAYMENT = 'evenement-creer-paiement',

  // EVENT CALENDAR
  EVENT_CALENDAR_MONTH_VIEW = 'evenement-calendrier-monthView',
  EVENT_CALENDAR_WEEK_VIEW = 'evenement-calendrier-weekView',

  LIST_EVENT = 'evenement',

  SHOW_EVENT_ID = 'evenement-show-id',

  // PAYMENTS
  PAYMENT_CONFIRM = 'paiement-confirmation',

  // EMPLOYEE
  EMPLOYEE_CREATE = 'destinataire-create',

  // AUTH
  FORGOT_PASSWORD = 'mot-de-passe-oublie',
  LOGIN = 'login',

  // NOTIFICATIONS
  NOTIFICATIONS_LIST = 'notifications',
  NOTIFICATIONS_SUBSCRIPTIONS = 'notifications-abonnements',

  // ADMIN
  ADMIN_EVENTS = 'admin-events',
  ADMIN_EMPLOYEES = 'admin-destinataires',
  ADMIN_EMPLOYEE_SHOW = 'admin-destinataires-show-id',

  // ADMIN USERS
  ADMIN_USER_SHOW_ACCOUNT = 'admin-user-show-id-account',
  ADMIN_USER_SHOW_EVENTS = 'admin-user-show-id-evenements',
  ADMIN_USER_SHOW_EMPLOYEES = 'admin-user-show-id-destinataires',
  ADMIN_USER_SHOW_SETTINGS = 'admin-user-show-id-account',
}
