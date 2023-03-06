<template>
<PageAuthWrapper>
  <div class="px-8">
    <template v-if="groupStore.getAllArray?.length > 0">
      <GroupList :groups="groupStore.getAllArray" />
    </template>
    <BaseMessage
      v-else
      class="max-w-md"
    >
      <div class="max-w-md space-y-2">
        <p>Vous n'avez créé aucun groupe</p>

        <BaseButton :href="{ name: 'groupe-creation' }">
          <template #icon>
            <PlusIconOutline />
          </template>
          Créer un groupe
        </BaseButton>
      </div>
    </BaseMessage>
  </div>
</PageAuthWrapper>
</template>

<script setup lang="ts">
import { uniq } from '@antfu/utils'
import {
  useEmployeeStore,
  useGroupStore,
  useUiStore,
} from '~~/store'

const { IncLoading, DecLoading } = useUiStore()
const { fetchByUser } = groupHook()
const { fetchMany } = employeeHook()

const groupStore = useGroupStore()
const employeeStore = useEmployeeStore()

onMounted(async () => {
  IncLoading()
  if (groupStore.getIsEmpty) {
    await fetchByUser()
  }

  const missingEmployees = uniq(groupStore.getAllArray
    .reduce((acc, emp) => [...acc, ...emp.employeeIds], [] as number[]))
    .filter(id => !employeeStore.isAlreadyInStore(id))

  if (missingEmployees.length > 0) {
    await fetchMany(missingEmployees)
  }

  DecLoading()
})

definePageMeta({
  layout: 'auth',
  isAuth: true,
  middleware: 'guards-middleware',
})
</script>
