import { defineStore } from 'pinia'
import { useExchangeDifference } from './exchange-difference'

type Product = {
  costInUSD: number
  groupId: number
  productId: number
  productName: string
  quantity: number
  cost: number
}

export const useGoods = defineStore('goods', {
  state: (): { items: Product[] } => ({
    items: []
  }),
  actions: {
    async fetch() {
      const { data } = await useFetch<Product[]>('http://localhost:3001/goods')
      this.items = data
    },
    changeCost() {
      const exchangeDifference = useExchangeDifference()

      this.items.map((item) => {
        item.cost = (item.costInUSD * exchangeDifference.value).toFixed(2)
        return item
      })
    }
  }
})
