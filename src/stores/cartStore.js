import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'
import ShowNotification from '@/shared/swal'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

export default defineStore('cartStore', {
  state: () => ({
    isLoading: false,
    carts: [],
    total: 0,
    final_total: 0,
    cart: {},
    isDone: ''
  }),
  actions: {
    getCart() {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/cart`
      this.isLoading = true
      axios
        .get(url)
        .then((response) => {
          this.isLoading = false
          this.cart = response.data.data
        })
        .catch((error) => {
          ShowNotification('error', `${error.response.data.message}`)
        })
    },
    addCart(id, qty = 1) {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/cart`
      this.isDone = id
      const cart = {
        product_id: id,
        qty
      }
      this.isLoading = true
      axios
        .post(url, { data: cart })
        .then((response) => {
          this.isLoading = false
          if (response.data.success) {
            this.getCart()
            this.isDone = ''
            ShowNotification('success', '已加入購物車')
          } else {
            ShowNotification('error', '加入購物車失敗')
          }
        })
        .catch((error) => {
          ShowNotification('error', `${error.response.data.message}`)
        })
    },
    updateCart(item) {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      axios
        .put(url, { data: cart })
        .then((response) => {
          this.isLoading = false
          if (response.data.success) {
            this.getCart()
          }
        })
        .catch((error) => {
          ShowNotification('error', `${error.response.data.message}`)
        })
    },
    removeCartItem(id) {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/cart/${id}`
      this.isLoading = true
      axios
        .delete(url)
        .then((response) => {
          this.isLoading = false
          if (response.data.success) {
            this.getCart()
            ShowNotification('success', '已從購物車移除')
          } else {
            ShowNotification('error', '從購物車移除失敗')
          }
        })
        .catch((error) => {
          ShowNotification('error', `${error.response.data.message}`)
        })
    },
    deleteAllCart() {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/carts`
      this.isLoading = true
      axios
        .delete(url)
        .then((response) => {
          this.isLoading = false
          if (response.data.success) {
            this.getCart()
            ShowNotification('success', '已清空購物車')
          } else {
            ShowNotification('error', '清空購物車失敗')
          }
        })
        .catch((error) => {
          ShowNotification('error', `${error.response.data.message}`)
        })
    },
    getProduct(id) {
      router.push(`/product/${id}`)
    },
    addCouponCode(coupon_code) {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/coupon`
      const coupon = {
        code: coupon_code
      }
      this.isLoading = true
      axios
        .post(url, { data: coupon })
        .then((response) => {
          this.isLoading = false
          if (response.data.success) {
            this.getCart()
            ShowNotification('success', '已套用優惠劵')
          } else {
            ShowNotification('error', '套用優惠劵失敗')
          }
        })
        .catch((error) => {
          ShowNotification('error', `${error.response.data.message}`)
        })
    },
    copyCouponCode() {
      const copyText = document.createElement('input')
      const text = 'funnietravel'
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      navigator.clipboard.writeText(text).then(() => {
        ShowNotification('success', '優惠碼複製成功')
      })
    }
  }
})
