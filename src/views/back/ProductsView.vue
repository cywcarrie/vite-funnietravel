<template>
  <VueLoading :active="isLoading" />
  <div class="text-end mt-3">
    <button class="btn btn-primary" type="button" @click="openModal(true)">
      <i class="bi bi-plus-lg pe-1"></i>新增產品
    </button>
  </div>
  <div class="table-responsive">
    <table class="table mt-4">
      <thead>
        <tr class="table-nowrap">
          <th class="text-nowrap" width="120">分類</th>
          <th class="text-nowrap">產品名稱</th>
          <th class="text-nowrap" width="120">原價</th>
          <th class="text-nowrap" width="120">售價</th>
          <th class="text-nowrap" width="100">是否上架</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td class="text-nowrap">{{ item.category }}</td>
          <td class="text-nowrap">{{ item.title }}</td>
          <td class="text-nowrap">
            {{ $format.currency(item.origin_price) }}
          </td>
          <td class="text-nowrap">
            {{ $format.currency(item.price) }}
          </td>
          <td>
            <span class="text-success" v-if="item.is_enabled">上架</span>
            <span class="text-body-secondary" v-else>未上架</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">
                編輯
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination :pages="pagination" @emit-pages="getProducts" />
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct" />
  <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct" />
</template>

<script>
import { inject, ref, onMounted } from 'vue'
import VueLoading from '@/components/VueLoading.vue'
import ProductModal from '@/components/ProductModal.vue'
import Pagination from '@/components/PaginationComponent.vue'
import DelModal from '@/components/DelModal.vue'
import ShowNotification from '@/shared/swal'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

export default {
  components: {
    VueLoading,
    ProductModal,
    DelModal,
    Pagination
  },
  setup() {
    const axios = inject('$axios')
    const products = ref([])
    const pagination = ref({})
    const tempProduct = ref({})
    const isNew = ref(false)
    const isLoading = ref(false)

    const productModal = ref(null)
    const delModal = ref(null)

    function getProducts(page = 1) {
      const api = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/products/?page=${page}`
      isLoading.value = true
      axios
        .get(api)
        .then((response) => {
          if (response.data.success) {
            products.value = response.data.products
            pagination.value = response.data.pagination
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
    function openModal(isNewModal, item) {
      if (isNewModal) {
        // eslint-disable-next-line no-const-assign
        tempProduct.value = {}
      } else {
        // eslint-disable-next-line no-const-assign
        tempProduct.value = { ...item }
      }
      isNew.value = isNewModal
      const productComponent = productModal.value
      productComponent.showModal()
    }
    function updateProduct(item) {
      // eslint-disable-next-line no-const-assign
      tempProduct.value = { ...item }
      let api = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      isLoading.value = true
      if (!isNew.value) {
        api = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      const productComponent = productModal.value
      axios[httpMethod](api, { data: tempProduct.value })
        .then((response) => {
          productComponent.hideModal()
          if (response.data.success) {
            getProducts()
            ShowNotification('success', '更新成功')
          } else {
            ShowNotification('error', '更新失敗')
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
    function openDelProductModal(item) {
      // eslint-disable-next-line no-const-assign
      tempProduct.value = { ...item }
      const delComponent = delModal.value
      delComponent.showModal()
    }
    function delProduct() {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/product/${tempProduct.value.id}`
      const delComponent = delModal.value
      isLoading.value = true
      axios
        .delete(url)
        .then((response) => {
          delComponent.hideModal()
          if (response.data.success) {
            getProducts()
            ShowNotification('success', '刪除成功')
          } else {
            ShowNotification('error', '刪除失敗')
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
    onMounted(() => {
      getProducts()
    })
    return {
      products,
      pagination,
      tempProduct,
      isNew,
      isLoading,
      getProducts,
      openModal,
      updateProduct,
      openDelProductModal,
      productModal,
      delProduct,
      delModal
    }
  }
}
</script>
