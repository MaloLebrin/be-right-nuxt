import { defineStore } from 'pinia'
import {
  baseAddressCreationForm,
  baseEventCreationForm,
  basePhotographerForm,
  createForm,
  defaultFormState,
  formState,
} from './state'
import type { BaseAddressCreationForm, BaseEventFormType, BasePhotographerForm } from './types'
import { FormEnum } from './types'

export const useUserStore = defineStore('form', {
  state: () => ({ ...formState }),

  getters: {
    getFormState: state => (type: FormEnum) => {
      switch (type) {
        case FormEnum.ADDRESS_FORM:
          return state.addressForm
        case FormEnum.EVENT_FORM:
          return state.eventform
        case FormEnum.PHOTOGRAPHER_FORM:
          return state.photographerForm
      }
    },

    isFormDirty: state => (type: FormEnum) => {
      switch (type) {
        case FormEnum.ADDRESS_FORM:
          return state.addressForm.isDirty
        case FormEnum.EVENT_FORM:
          return state.eventform.isDirty
        case FormEnum.PHOTOGRAPHER_FORM:
          return state.photographerForm.isDirty
      }
    },
  },

  actions: {
    setFormDirty(type: FormEnum) {
      switch (type) {
        case FormEnum.ADDRESS_FORM:
          return this.addressForm.isDirty = true
        case FormEnum.EVENT_FORM:
          return this.eventform.isDirty = true
        case FormEnum.PHOTOGRAPHER_FORM:
          return this.photographerForm.isDirty = true
      }
    },

    setAddressForm(data: Partial<BaseAddressCreationForm>) {
      this.addressForm = {
        ...this.addressForm,
        ...data,
        isDirty: true,
      }
    },

    setEventForm(data: Partial<BaseEventFormType>) {
      this.eventform = {
        ...this.eventform,
        ...data,
        isDirty: true,
      }
    },

    setPhotographerForm(data: Partial<BasePhotographerForm>) {
      this.photographerForm = {
        ...this.photographerForm,
        ...data,
        isDirty: true,
      }
    },

    resetForm(type: FormEnum) {
      switch (type) {
        case FormEnum.ADDRESS_FORM:
          return this.addressForm = createForm(baseAddressCreationForm)
        case FormEnum.EVENT_FORM:
          return this.eventform = createForm(baseEventCreationForm)
        case FormEnum.PHOTOGRAPHER_FORM:
          return this.photographerForm = createForm(basePhotographerForm)
      }
    },

    resetState() {
      this.$state = defaultFormState()
    },
  },
})
