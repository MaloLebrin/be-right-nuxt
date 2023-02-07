import { defineStore } from 'pinia'
import { createActions, createGetters } from '@malolebrin/pinia-entity-store'
import { answerState, defaultAnswerState } from './state'
import type { AnswerType } from './types'

export const useAnswerStore = defineStore('answers', {
  state: () => ({
    ...answerState,
  }),

  getters: {
    // getters common to all entities
    ...createGetters<AnswerType>(answerState),

    // bellow getters in this specific store
    getManyByEventId(state) {
      return (eventId: number) => Object.values(state.entities.byId).filter(answer => answer.eventId === eventId)
    },
    getManyByEmployeeId(state) {
      return (employeeId: number) => Object.values(state.entities.byId).filter(answer => answer.employeeId === employeeId)
    },
  },

  actions: {

    ...createActions<AnswerType>(answerState),

    addMany(answers: AnswerType[]) {
      answers.forEach(answer => {
        this.entities.byId[answer.id] = { ...answer, $isDirty: false }
        this.entities.allIds.push(answer.id)
      })
    },

    deleteManyAnswers(ids: number[]) {
      ids.forEach(id => {
        delete this.entities.byId[id]
        this.entities.allIds = this.entities.allIds.filter(entityId => entityId !== id)
      })
    },

    resetState() {
      this.$state = defaultAnswerState()
    },
    // bellow Actions in this specific store
  },
})
