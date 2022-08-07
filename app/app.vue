<template>
  <div :class="$style.root">
    <ul :class="$style.list">
      <li v-for="product in goods.items" :key="product.productId">
        <ProductCard :product="product" :less-cost="lessCost" />
      </li>
    </ul>
    <aside>
      <h3>Корзина</h3>
      <div v-if="userCart.items.length !== 0">
        <div :class="$style.table">
          <strong>Наименование товара</strong>
          <strong>Количество</strong>
          <strong>Цена</strong>
          <template v-for="product in userCart.selectedProducts" :key="product.productId">
            <div>{{ product.productName }}</div>
            <div>{{ product.quantity }}</div>
            <div>{{ product.cost }}</div>
          </template>
        </div>
        <div>Общая стоимость: <strong>{{ userCart.totalCost }}</strong></div>
      </div>
      <div v-else>
        В корзине отсутствуют товары
      </div>
    </aside>
  </div>
</template>

<script setup>
import { useGoods, useExchangeDifference, useUserCart } from '~/store'

const userCart = useUserCart()
const goods = useGoods()
const exchangeDifference = useExchangeDifference()
const lessCost = ref(null)

await goods.fetch()

onMounted(() => {
  const socket = new WebSocket('ws://localhost:3001')
  socket.onmessage = ({ data: rateValue }) => {
    lessCost.value = exchangeDifference.value > rateValue
    exchangeDifference.update(+rateValue)
    goods.changeCost()
  }
})
</script>

<style module>
.root {
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  list-style: none;
}

.table {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  padding: 30px 0;
}
</style>
