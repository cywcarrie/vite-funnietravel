import { defineStore } from 'pinia'
import axios from 'axios'
import ShowNotification from '@/mixins/swal'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

export default defineStore('favoriteStore', {
  state: () => ({
    isLoading: false,
    products: [],
    favoriteProduct: [],
    favoriteData: JSON.parse(localStorage.getItem('favorite')) || []
  }),
  actions: {
    getProducts() {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/products/all`
      this.isLoading = true
      axios
        .get(url)
        .then((response) => {
          this.products = response.data.products
          this.getFavorite()
          this.isLoading = false
        })
        .catch((error) => {
          ShowNotification('error', `${error.response.data.message}`)
        })
    },
    getFavorite() {
      this.favoriteProduct = this.products.filter(
        (item) => this.favoriteData.indexOf(item.id) !== -1
      )
    },
    addFavorite(id) {
      this.isLoading = true
      const favoriteId = this.favoriteData.indexOf(id)
      if (favoriteId === -1) {
        this.favoriteData.push(id)
        ShowNotification('success', '已加入我的最愛')
      } else {
        this.favoriteData.splice(favoriteId, 1)
        ShowNotification('success', '已從我的最愛移除')
      }
      setTimeout(() => {
        this.isLoading = false
      }, 300)
      this.setStorage()
    },
    setStorage() {
      localStorage.setItem('favorite', JSON.stringify(this.favoriteData))
    },
    removeFavorite(item) {
      this.isLoading = true
      this.favoriteData.splice(this.favoriteData.indexOf(item.id), 1)
      localStorage.setItem('favorite', JSON.stringify(this.favoriteData))
      this.getFavorite()
      this.isLoading = false
      ShowNotification('success', '已從我的最愛移除')
    }
  }
})
