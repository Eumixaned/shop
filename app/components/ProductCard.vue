<template>
  <div :class="$style.root">
    <h4>
      {{ product.productName }}
    </h4>
    <p>
      Стоимость:
      <span
        :class="[
          lessCost === false && $style.danger,
          lessCost === true && $style.success
        ]"
      >
        {{ product.cost }} руб
      </span>
    </p>
    <p>Кол-во {{ product.quantity }}</p>
    <button v-if="quantity === 0" @click="increaseQuantity">В корзину</button>
    <div v-else>
      <button @click="reduceQuantity">-</button>
      {{ quantity }} шт.
      <button @click="increaseQuantity" :disabled="quantity === product.quantity">
        +
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUserCart } from '~/store'

const {
  product: { productId }
} = defineProps(['product', 'lessCost'])
const userCartItems = useUserCart()
let quantity = ref(getQuantity())

function getQuantity() {
  const item = userCartItems.items?.find((item) => item.productId === productId)

  return item?.quantity ?? 0
}

function addToCart() {
  userCartItems.add({
    productId,
    quantity
  })
}

function reduceQuantity() {
  quantity.value -= 1

  quantity.value === 0 ? userCartItems.delete(productId) : addToCart()
}

function increaseQuantity() {
  quantity.value += 1
  addToCart()
}
</script>

<style module>
.root {
  padding: 32px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 12px -4px rgba(20, 48, 72, 0.2);
  border-radius: 12px;
}

.danger {
  color: red;
}

.success {
  color: green;
}
</style>
