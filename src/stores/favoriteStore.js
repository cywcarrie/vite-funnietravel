import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import ShowNotification from '@/shared/swal'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

export const useFavoriteStore = defineStore('favoriteStore', () => {
  const isLoading = ref(false)
  const products = ref([])
  const favoriteProduct = ref([])
  const favoriteData = ref(JSON.parse(localStorage.getItem('favorite')) || [])

  function getProducts() {
    const url = `${VITE_APP_API}api/${VITE_APP_PATH}/products/all`
    isLoading.value = true
    axios
      .get(url)
      .then((response) => {
        products.value = response.data.products
        getFavorite()
      })
      .catch((error) => {
        const message = error.response?.data?.message || '發生錯誤，請稍後再試'
        ShowNotification('error', message)
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  function getFavorite() {
    favoriteProduct.value = products.value.filter(
      (item) => favoriteData.value.indexOf(item.id) !== -1
    )
  }
  function addFavorite(id) {
    isLoading.value = true
    const index = favoriteData.value.indexOf(id)

    if (index === -1) {
      favoriteData.value.push(id)
      ShowNotification('success', '已加入我的最愛')
    } else {
      favoriteData.value.splice(index, 1)
      ShowNotification('success', '已從我的最愛移除')
    }

    setStorage()
    getFavorite()

    setTimeout(() => {
      isLoading.value = false
    }, 300)
  }
  function setStorage() {
    localStorage.setItem('favorite', JSON.stringify(favoriteData.value))
  }
  function removeFavorite(item) {
    isLoading.value = true
    const index = favoriteData.value.indexOf(item.id)
    if (index !== -1) {
      favoriteData.value.splice(index, 1)
    }

    setStorage()
    getFavorite()
    isLoading.value = false
    ShowNotification('success', '已從我的最愛移除')
  }

  return {
    isLoading,
    products,
    favoriteProduct,
    favoriteData,
    getProducts,
    getFavorite,
    addFavorite,
    setStorage,
    removeFavorite
  }
})
