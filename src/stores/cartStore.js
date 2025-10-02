import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
import ShowNotification from '@/shared/swal'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

export const useCartStore = defineStore('cartStore', () => {
  const isLoading = ref(false)
  const carts = ref([])
  const total = ref(0)
  const final_total = ref(0)
  const cart = ref({})
  const isDone = ref('')

  function getCart() {
    const url = `${VITE_APP_API}api/${VITE_APP_PATH}/cart`
    isLoading.value = true
    axios
      .get(url)
      .then((response) => {
        cart.value = response.data.data
      })
      .catch((error) => {
        const message = error.response?.data?.message || '發生錯誤，請稍後再試'
        ShowNotification('error', message)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
  function addCart(id, qty = 1) {
    const url = `${VITE_APP_API}api/${VITE_APP_PATH}/cart`
    isDone.value = id
    const cart = {
      product_id: id,
      qty
    }
    isLoading.value = true
    axios
      .post(url, { data: cart })
      .then((response) => {
        if (response.data.success) {
          getCart()
          isDone.value = ''
          ShowNotification('success', '已加入購物車')
        } else {
          ShowNotification('error', '加入購物車失敗')
        }
      })
      .catch((error) => {
        const message = error.response?.data?.message || '發生錯誤，請稍後再試'
        ShowNotification('error', message)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
  function updateCart(item) {
    const url = `${VITE_APP_API}api/${VITE_APP_PATH}/cart/${item.id}`
    const data = {
      product_id: item.product_id,
      qty: item.qty
    }
    isLoading.value = true
    axios
      .put(url, { data })
      .then((response) => {
        if (response.data.success) {
          getCart()
        }
      })
      .catch((error) => {
        const message = error.response?.data?.message || '發生錯誤，請稍後再試'
        ShowNotification('error', message)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
  function removeCartItem(id) {
    const url = `${VITE_APP_API}api/${VITE_APP_PATH}/cart/${id}`
    isLoading.value = true
    axios
      .delete(url)
      .then((response) => {
        if (response.data.success) {
          getCart()
          ShowNotification('success', '已從購物車移除')
        } else {
          ShowNotification('error', '從購物車移除失敗')
        }
      })
      .catch((error) => {
        const message = error.response?.data?.message || '發生錯誤，請稍後再試'
        ShowNotification('error', message)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
  function deleteAllCart() {
    const url = `${VITE_APP_API}api/${VITE_APP_PATH}/carts`
    isLoading.value = true
    axios
      .delete(url)
      .then((response) => {
        if (response.data.success) {
          getCart()
          ShowNotification('success', '已清空購物車')
        } else {
          ShowNotification('error', '清空購物車失敗')
        }
      })
      .catch((error) => {
        const message = error.response?.data?.message || '發生錯誤，請稍後再試'
        ShowNotification('error', message)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
  function getProduct(id) {
    router.push(`/product/${id}`)
  }
  function addCouponCode(coupon_code) {
    const url = `${VITE_APP_API}api/${VITE_APP_PATH}/coupon`
    const coupon = {
      code: coupon_code
    }
    isLoading.value = true
    axios
      .post(url, { data: coupon })
      .then((response) => {
        if (response.data.success) {
          getCart()
          ShowNotification('success', '已套用優惠劵')
        } else {
          ShowNotification('error', '套用優惠劵失敗')
        }
      })
      .catch((error) => {
        const message = error.response?.data?.message || '發生錯誤，請稍後再試'
        ShowNotification('error', message)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
  function copyCouponCode() {
    const text = 'funnietravel'
    navigator.clipboard
      .writeText(text)
      .then(() => {
        ShowNotification('success', '優惠碼複製成功')
      })
      .catch(() => {
        ShowNotification('error', '複製失敗，請再試一次')
      })
  }
  return {
    isLoading,
    carts,
    total,
    final_total,
    cart,
    isDone,
    getCart,
    addCart,
    updateCart,
    removeCartItem,
    deleteAllCart,
    getProduct,
    addCouponCode,
    copyCouponCode
  }
})
