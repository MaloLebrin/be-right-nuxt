import { useCompanyStore, useUiStore, useUserStore } from '~~/store'

export default defineNuxtRouteMiddleware(async to => {
  const userId = parseInt(to.params.id.toString())

  const uiStore = useUiStore()
  const userStore = useUserStore()
  const companyStore = useCompanyStore()
  const { IncLoading, DecLoading } = uiStore

  const { fetchOne: fetchOneAddress } = addressHook()
  const { fetchOne: fetchOneCompany } = companyHook()

  const user = userStore.getOne(userId)

  if (user) {
    IncLoading()
    if (user.companyId && !companyStore.isAlreadyInStore(user.companyId)) {
      await fetchOneCompany(user.companyId)
    }

    const company = companyStore.getOne(user.companyId)

    if (company?.addressId) {
      await fetchOneAddress(company.addressId)
    }
    DecLoading()
  }
})
