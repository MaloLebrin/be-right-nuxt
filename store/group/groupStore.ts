import { defineStore } from 'pinia'
import { createActions, createGetters } from '@malolebrin/pinia-entity-store'
import { defaultGroupState, groupState } from './state'
import type { Group } from './types'

export const useGroupStore = defineStore('group', {
  state: () => ({
    ...groupState,
  }),
  getters: {
    ...createGetters<Group>(groupState),
  },

  actions: {
    ...createActions<Group>(groupState),

    addMany(groups: Group[]) {
      groups.forEach(group => {
        this.entities.byId[group.id] = { ...group, $isDirty: false }
        this.entities.allIds.push(group.id)
      })
    },

    // actions common to all entities
    resetState() {
      this.$state = defaultGroupState()
    },

  },
})
