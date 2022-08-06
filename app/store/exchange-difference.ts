import { defineStore } from 'pinia'

export const useExchangeDifference = defineStore('exchangeDifference', {
  state: () => ({
    value: 20
  }),
  actions: {
    update(value: number) {
      this.value = value
    }
  }
})
