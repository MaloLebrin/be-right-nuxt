<template>
<PageAuthWrapper>
  <GroupDetail
    v-if="groupStore.getOne(groupId)"
    :group="groupStore.getOne(groupId)"
  />

  <BaseLoader v-else-if="uiStore.getUIIsLoading" />

  <div
    v-else
    class="flex justify-center"
  >
    <BaseMessage>
      <div class="flex flex-col items-center space-y-4">
        <p>Oups 🫢 Il semblerait que ce groupe n'existe pas</p>
        <BaseButton :href="{ name: 'groupe' }">
          <template #icon>
            <ListBulletIcon />
          </template>
          Voir tous mes groupes
        </BaseButton>
      </div>
    </BaseMessage>
  </div>
</PageAuthWrapper>
</template>

<script setup lang="ts">
import { ListBulletIcon } from '@heroicons/vue/24/outline'
import PageAuthWrapper from '~/components/Page/PageAuthWrapper.vue'
import BaseButton from '~/components/Base/BaseButton.vue'
import BaseMessage from '~/components/Base/BaseMessage.vue'
import BaseLoader from '~/components/Base/BaseLoader.vue'
import GroupDetail from '~~/components/Group/Detail/index.vue'
import { useGroupStore, useUiStore } from '~~/store'

const groupStore = useGroupStore()
const uiStore = useUiStore()
const { IncLoading, DecLoading } = uiStore

const { fetchMany } = groupHook()

const route = useRoute()

const groupId = route.name === 'groupe-show-id' && parseInt(route.params.id.toString())

onMounted(async () => {
  if (groupId && !groupStore.isAlreadyInStore(groupId)) {
    IncLoading()
    await fetchMany([groupId])
    DecLoading()
  }
})

definePageMeta({
  layout: 'auth',
  isAuth: true,
  middleware: 'guards-middleware',
})
</script>
