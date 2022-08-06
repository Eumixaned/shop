import { useGoods } from './goods'
import { defineStore } from 'pinia'

type CartProduct = {
  productId: number
  quantity: number
}

export const useUserCart = defineStore('userCart', {
  state: (): { items: CartProduct[] } => ({
    items: []
  }),
  getters: {
    selectedProducts(state) {
      const goods = useGoods()

      return state.items.map((item) => {
        const { cost, productName } = goods.items.find(
          (product) => product.productId === item.productId
        )

        return {
          ...item,
          productName,
          cost
        }
      })
    },
    totalCost() {
      return this.selectedProducts.reduce((accum, { cost, quantity }) => {
        return (+accum + cost * quantity).toFixed(2)
      }, 0)
    }
  },
  actions: {
    add(product: CartProduct) {
      const selectedItem = this.items.find(
        (item) => item.productId === product.productId
      )

      if (selectedItem) {
        selectedItem.quantity = product.quantity
      } else {
        this.items.push(product)
      }
    },
    delete(productId) {
      const item = this.items.findIndex((item) => item.productId === productId)
      this.items.splice(item, 1)
    }
  }
})
