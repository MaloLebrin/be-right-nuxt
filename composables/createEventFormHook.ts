import { RouteNames } from '~~/helpers/routes'
import type { EventTypeCreate } from '~~/store'
import { useFormStore, useUiStore, useUserStore } from '~~/store'
import type { BaseAddressCreationForm, PhotographerCreatePayload } from '~~/store/form/types'
import { FormEnum } from '~~/store/form/types'

export default function createEventFormHook() {
  const { $router } = useNuxtApp()

  const userStore = useUserStore()
  const formStore = useFormStore()
  const uiStore = useUiStore()
  const { IncLoading, DecLoading } = uiStore

  const { postPhotographer } = userHook()
  const { postOne: postOneEvent } = eventHook()
  const router = useRouter()

  const isEventCreation = computed(() => $router.currentRoute.value.name === RouteNames.CREATE_EVENT_STEP_1)
  const isEmployeeStepEventCreation = computed(() => $router.currentRoute.value.name === RouteNames.CREATE_EVENT_STEP_2)
  const isPhotographerCreation = computed(() => $router.currentRoute.value.name === RouteNames.CREATE_EVENT_STEP_3)
  const isEnd = computed(() => $router.currentRoute.value.name === RouteNames.CREATE_EVENT_STEP_PAYMENT)

  const currentStepIndex = computed(() => {
    if (isEventCreation.value) {
      return 0
    }
    if (isEmployeeStepEventCreation.value) {
      return 1
    }
    if (isPhotographerCreation.value) {
      return 2
    }
    if (isEnd.value) {
      return 3
    }
    return 0
  })

  async function submitCreationEvent() {
    IncLoading()
    let photographer = null

    const {
      isSelectedPhotographerValid,
      isNewPhotographerValid,
      getFormState,
      getPhotographerId,
      resetForm,
    } = formStore

    if (!isSelectedPhotographerValid && isNewPhotographerValid) {
      const payload = getFormState(FormEnum.PHOTOGRAPHER_FORM)
      photographer = await postPhotographer(payload as PhotographerCreatePayload)
    } else if (getPhotographerId) {
      photographer = userStore.getOne(getPhotographerId)
    }

    resetForm(FormEnum.PHOTOGRAPHER_FORM)

    if (photographer) {
      const newEvent = await postOneEvent(
        {
          event: getFormState(FormEnum.EVENT_FORM) as unknown as EventTypeCreate,
          address: getFormState(FormEnum.ADDRESS_FORM) as BaseAddressCreationForm,
          photographerId: photographer.id,
        })

      if (newEvent) {
        resetForm(FormEnum.EVENT_FORM)

        resetForm(FormEnum.ADDRESS_FORM)

        router.push({
          name: RouteNames.SHOW_EVENT_ID,
          params: {
            id: newEvent.id,
          },
        })
      }
    }
    DecLoading()
  }

  return {
    currentStepIndex,
    isEmployeeStepEventCreation,
    submitCreationEvent,
    isEnd,
    isEventCreation,
    isPhotographerCreation,
  }
}
