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
    getNotEmptyGroups: state => Object.values(state.entities.byId).filter(group => group.employeeIds.length > 0),
  },

  actions: {
    ...createActions<Group>(groupState),

    addMany(groups: Group[]) {
      groups.forEach(group => {
        this.entities.byId[group.id] = { ...group, $isDirty: false }
        this.entities.allIds.push(group.id)
      })
    },

    removeOne(id: number) {
      delete this.entities.byId[id]
      this.entities.allIds = this.entities.allIds.filter(entityId => entityId !== id)
    },

    // actions common to all entities
    resetState() {
      this.$state = defaultGroupState()
    },

    updateOneGroup(id: number, data: Partial<Group>) {
      if (this.entities.byId[id] !== null || this.entities.byId[id] !== undefined) {
        this.entities.byId[id] = {
          ...this.entities.byId[id],
          ...data,
        }
      }
    },

    updateManyGroups(groups: Group[]) {
      groups.forEach(group => {
        if (this.entities.byId[group.id] !== null || this.entities.byId[group.id] !== undefined) {
          this.entities.byId[group.id] = {
            ...this.entities.byId[group.id],
            ...group,
          }
        }
      })
    },

  },
})
