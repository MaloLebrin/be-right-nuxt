<template>
<PageAuthWrapper>
  <div
    v-if="user"
    class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0"
  >
    <AccountBaseCard :title="`Profile de ${getUserfullName(user)}`">
      <div class="px-4 mt-6">
        <UserForm :user="user" />
      </div>
    </AccountBaseCard>

    <AccountBaseCard
      v-if="company"
      :title="`Entreprise ${company?.name}`"
    >
      <div class="px-4 mt-6">
        <AccountCompanyForm :company="company" />
      </div>
    </AccountBaseCard>

    <AccountBaseCard
      v-if="company && companyAddress"
      :title="`Adresse de ${company?.name}`"
    >
      <div class="px-4 mt-6">
        <AddressForm
          :address="companyAddress"
          :company-id="company?.id"
        />
      </div>
    </AccountBaseCard>

    <AccountBaseCard :title="`Signature de ${getUserfullName(user)}`">
      <div class="px-4 mt-6">
        <SignatureForm
          :signature="user?.signature || undefined"
          @save="saveUserSignature"
        />
      </div>
    </AccountBaseCard>
  </div>
</PageAuthWrapper>
</template>

<script setup lang="ts">
import PageAuthWrapper from '~~/components/Page/PageAuthWrapper.vue'
import SignatureForm from '~~/components/Signature/SignatureForm.vue'
import UserForm from '~/components/User/UserForm.vue'
import AddressForm from '~/components/address/AddressForm.vue'
import AccountBaseCard from '~~/components/Account/BaseCard.vue'
import AccountCompanyForm from '~~/components/Account/CompanyForm.vue'
import { useAddressStore, useCompanyStore, useUserStore } from '~~/store'

const userStore = useUserStore()
const companyStore = useCompanyStore()
const addressStore = useAddressStore()
const { postUserSignature } = userHook()

const route = useRoute()

const user = computed(() => {
  const params = route.params as Record<'id', string>
  return userStore.getOne(parseInt(params.id))
})
const company = computed(() => companyStore.getOne(user.value?.companyId))
const companyAddress = computed(() => addressStore.getOne(company.value?.addressId))

async function saveUserSignature(str: string) {
  if (user.value) {
    await postUserSignature(str, user.value.id)
  }
}

definePageMeta({
  layout: 'admin-user',
  isAuth: true,
  isAdmin: true,
  middleware: [
    'guards-middleware',
    'fetch-user-middleware',
    'company-middleware',
  ],
})
</script>
