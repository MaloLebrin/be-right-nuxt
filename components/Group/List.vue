<template>
<div class="flex flex-col items-center max-w-4xl">
  <div class="w-full max-w-4xl p-2 mx-auto space-y-6 bg-white rounded-2xl">
    <Disclosure
      v-for="group in groups"
      v-slot="{ open }"
      :key="group.id"
      as="div"
      class="rounded-md shadow-md"
    >
      <DisclosureButton
        class="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-red-900 bg-red-100 rounded-lg hover:bg-red-200 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-75"
      >
        <span>{{ group.name }}</span>
        <ChevronUpIconOutline
          :class="open ? 'rotate-180 transform' : ''"
          class="w-5 h-5 text-red-500"
        />
      </DisclosureButton>
      <transition
        enter-active-class="transition ease-out duration-250"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <DisclosurePanel class="px-4 py-4 text-sm text-gray-500">
          <p class="my-2">
            {{ group.description }}
          </p>

          <ul class="px-4 py-2 space-y-2 overflow-hidden overflow-y-visible max-h-72">
            <li>
              <BaseButton
                title="Ajouter un destinataire"
                @click="openAddRecipientModal(group.id)"
              >
                <template #icon>
                  <PlusCircleIconOutline />
                </template>
                Ajouter un destinataire à la liste
              </BaseButton>
            </li>
            <li
              v-for="employee in getEmployees(group).value"
              :key="employee.id"
              class="flex items-center justify-between px-4 py-2 bg-blue-100 rounded-md"
            >
              <p class="text-blue-800">
                {{ getEmployeeFullname(employee) }}
              </p>

              <div class="flex items-center space-x-2">
                <BaseButton
                  :href="{ name: 'destinataire' }"
                  title="Voir"
                  :disabled="uiStore.getUIIsLoading"
                >
                  <EyeIconOutline class="w-4 h-4 text-blue-800" />
                </BaseButton>
                <BaseButton
                  title="Retirer de la liste"
                  :disabled="uiStore.getUIIsLoading"
                  @click="removeRecipient(employee.id, group.id)"
                >
                  <MinusCircleIconOutline class="w-4 h-4 m-0 text-red-500" />
                </BaseButton>
              </div>
            </li>
          </ul>
        </DisclosurePanel>
      </transition>
    </Disclosure>
  </div>
</div>
</template>

<script setup lang="ts">
import type { Group } from '~~/store'
import { ModalModeEnum, ModalNameEnum, useEmployeeStore, useUiStore } from '~~/store'

interface Props {
  groups: Group[]
}

withDefaults(defineProps<Props>(), {
  groups: () => [],
})

const employeeStore = useEmployeeStore()
const uiStore = useUiStore()
const { setUiModal } = uiStore
const { getEmployeeFullname } = employeeHook()
const { removeRecipient } = groupHook()
const getEmployees = (group: Group) => computed(() => employeeStore.getMany(group.employeeIds))

function openAddRecipientModal(groupId: number) {
  setUiModal({
    modalMode: ModalModeEnum.EDIT,
    modalName: ModalNameEnum.ADD_RECIPIENT_TO_GROUP,
    isActive: true,
    data: {
      groupId,
    },
  })
}
</script>
