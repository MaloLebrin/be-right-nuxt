<template>
<article v-if="employee">
  <!-- Profile header -->
  <div>
    <div v-if="$isNotMobile">
      <NuxtImg
        class="object-cover w-full h-56"
        src="/img/employee-profil-background.webp"
        alt="Photo de couverture du destinataire"
      />
    </div>
    <div class="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
      <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
        <div class="mt-12 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
          <div class="flex-1 min-w-0 mt-6 sm:hidden 2xl:block">
            <h1 class="text-2xl font-bold text-center text-gray-900 truncate md:text-left">
              {{ getEmployeeFullname(employee) }}
            </h1>
          </div>
          <div class="flex items-center justify-center mt-2 space-x-2 md:mt-6 md:justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4">
            <BaseButton
              :href="{
                name: 'destinataire-edit-id',
                params: {
                  id: employee.id,
                },
              }"
            >
              <template #icon>
                <PencilIcon
                  aria-hidden="true"
                />
              </template>
              Modifier
            </BaseButton>
            <BaseButton
              v-show="!noNullUndefined(employee.deletedAt)"
              color="red"
              @click="deleteOneEmployee"
            >
              <template #icon>
                <TrashIcon
                  aria-hidden="true"
                />
              </template>
              Supprimer
            </BaseButton>
            <BaseButton
              v-if="authStore.isAuthUserAdmin"
              color="red"
              @click="deleteOneForEvetEmployee"
            >
              <template #icon>
                <TrashIcon
                  aria-hidden="true"
                />
              </template>
              Supprimer Définitvement
            </BaseButton>
          </div>
        </div>
      </div>
      <div class="flex-1 hidden min-w-0 mt-6 sm:block 2xl:hidden">
        <h1 class="text-2xl font-bold text-gray-900 truncate">
          {{ getEmployeeFullname(employee) }}
        </h1>
      </div>
    </div>
  </div>

  <!-- Description list -->
  <div class="max-w-5xl px-4 mx-auto mt-6 sm:px-6 lg:px-8">
    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
      <div
        class="sm:col-span-1"
      >
        <dt class="text-sm font-medium text-gray-500">
          Téléphone
        </dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ employee.phone }}
        </dd>
      </div>
      <div
        class="sm:col-span-1"
      >
        <dt class="text-sm font-medium text-gray-500">
          Email
        </dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ employee.email }}
        </dd>
      </div>
      <div
        class="sm:col-span-1"
      >
        <dt class="text-sm font-medium text-gray-500">
          Créé le
        </dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ $toFormat(employee.createdAt, 'D MMMM YYYY') }}
        </dd>
      </div>
      <div
        v-if="employee.deletedAt"
        class="sm:col-span-1"
      >
        <dt class="text-sm font-medium text-gray-500">
          Supprimé le
        </dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ $toFormat(employee.deletedAt, 'D MMMM YYYY') }}
        </dd>
      </div>
    </dl>
    <dl
      v-if="employeeAddress"
      class="grid grid-cols-1 mt-4 gap-x-4 gap-y-8 sm:grid-cols-2"
    >
      <div
        class="sm:col-span-1"
      >
        <dt class="text-sm font-medium text-gray-500">
          Addresse
        </dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ employeeAddress.addressLine }}
        </dd>
        <dd
          v-if="employeeAddress.addressLine2"
          class="mt-1 text-sm text-gray-900"
        >
          {{ employeeAddress.addressLine2 }}
        </dd>
      </div>
      <div
        class="sm:col-span-1"
      >
        <dt class="text-sm font-medium text-gray-500">
          Code postal
        </dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ employeeAddress.postalCode }}
        </dd>
      </div>
      <div
        class="sm:col-span-1"
      >
        <dt class="text-sm font-medium text-gray-500">
          Ville
        </dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ employeeAddress.city }}
        </dd>
      </div>
      <div
        class="sm:col-span-1"
      >
        <dt class="text-sm font-medium text-gray-500">
          Pays
        </dt>
        <dd class="mt-1 text-sm text-gray-900">
          {{ employeeAddress.country }}
        </dd>
      </div>
    </dl>
  </div>

  <EmployeeCreator
    v-if="authStore.isAuthUserAdmin && employeeCreator"
    class="mt-4"
    :employee-creator="employeeCreator"
    :is-only-for-admin="authStore.isAuthUserAdmin"
  />
</article>
</template>

<script setup lang="ts">
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import EmployeeCreator from '../EmployeeCreator.vue'
import BaseButton from '~/components/Base/BaseButton.vue'
import {
  useAddressStore,
  useAuthStore,
  useUiStore,
  useUserStore,
} from '~~/store'
import type { EmployeeType } from '~~/types'
import { ModalModeEnum, ModalNameEnum } from '~~/types'
import { getEmployeeFullname } from '~/utils/employee'

interface Props {
  employee: EmployeeType | null
}

const props = defineProps<Props>()

const authStore = useAuthStore()
const userStore = useUserStore()
const addressStore = useAddressStore()
const { setUiModal } = useUiStore()
const { $isNotMobile } = useNuxtApp()

const employeeCreator = computed(() => {
  if (authStore.isAuthUserAdmin && props.employee?.companyId) {
    return userStore.getUserByCompanyId(props.employee?.companyId)
  }
  return userStore.getOne(userStore.getAuthUserId)
})

const employeeAddress = computed(() => addressStore.getOne(props.employee?.addressId))

function deleteOneEmployee() {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.DELETE_EMPLOYEE,
    modalMode: ModalModeEnum.DELETE,
    data: {
      employee: props.employee,
    },
  })
}

function deleteOneForEvetEmployee() {
  setUiModal({
    isActive: true,
    modalName: ModalNameEnum.DELETE_EMPLOYEE_FOR_EVER,
    modalMode: ModalModeEnum.DELETE,
    data: {
      employee: props.employee,
      forEver: true,
    },
  })
}
</script>
