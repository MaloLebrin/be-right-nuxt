import { defineStore } from 'pinia'
import { createActions, createGetters } from '@malolebrin/pinia-entity-store'
import { uniq } from '@antfu/utils'
import { companyState } from './state'
import type { Company } from './types'

export const useCompanyStore = defineStore('company', {
  state: () => ({ ...companyState }),

  getters: {
    ...createGetters<Company>(companyState),
  },

  actions: {
    ...createActions<Company>(companyState),

    addOne(company: Company) {
      if (this.entities.byId[company.id] === null || this.entities.byId[company.id] === undefined) {
        this.entities.byId[company.id] = { ...company, $isDirty: false }
        this.entities.allIds = uniq([...this.entities.allIds, company.id])
      }
    },

    addMany(companies: Company[]) {
      companies.forEach(company => this.addOne(company))
    },

  },
})
