import { defineStore } from 'pinia'
import { createActions, createGetters } from '@malolebrin/pinia-entity-store'
import { companyState } from './state'
import type { Company } from './types'

export const useCompanyStore = defineStore('company', {
  state: () => ({ ...companyState }),

  getters: {
    ...createGetters<Company>(companyState),
  },

  actions: {
    ...createActions<Company>(companyState),
  },
})
