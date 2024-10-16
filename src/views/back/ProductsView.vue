<template>
  <VueLoading :active="isLoading" />
  <div class="text-end mt-3">
    <button class="btn btn-primary" type="button" @click="openModal(true)">
      <i class="bi bi-plus-lg pe-1"></i>新增產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否上架</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">
          {{ $filters.currency(item.origin_price) }}
        </td>
        <td class="text-right">
          {{ $filters.currency(item.price) }}
        </td>
        <td>
          <span class="text-success" v-if="item.is_enabled">上架</span>
          <span class="text-muted" v-else>未上架</span>
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
  <PaginationComponent :pages="pagination" @emit-pages="getProducts" />
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct" />
  <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct" />
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import DelModal from '@/components/DelModal.vue'
import VueLoading from '@/components/VueLoading.vue'
import ShowNotification from '@/mixins/swal'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

export default {
  components: {
    VueLoading,
    ProductModal,
    DelModal,
    PaginationComponent
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false
    }
  },
  methods: {
    getProducts(page = 1) {
      const api = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/products/?page=${page}`
      this.isLoading = true
      this.$http
        .get(api)
        .then((response) => {
          this.isLoading = false
          if (response.data.success) {
            this.products = response.data.products
            this.pagination = response.data.pagination
          }
        })
        .catch((error) => {
          this.pushMsg({
            style: 'danger',
            title: `${error.response.data.message}`
          })
        })
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {}
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },
    updateProduct(item) {
      this.tempProduct = item
      // 新增
      let api = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      // 編輯
      if (!this.isNew) {
        api = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      const productComponent = this.$refs.productModal
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((response) => {
          productComponent.hideModal()
          if (response.data.success) {
            this.getProducts()
            ShowNotification('success', '更新成功')
          } else {
            ShowNotification('error', '更新失敗')
          }
        })
        .catch((error) => {
          ShowNotification('error', `${error.response.data.message}`)
        })
    },
    // 開啟刪除 Modal
    openDelProductModal(item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    delProduct() {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http
        .delete(url)
        .then((response) => {
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          if (response.data.success) {
            this.getProducts()
            ShowNotification('success', '刪除商品成功')
          } else {
            ShowNotification('error', '刪除商品失敗')
          }
        })
        .catch((error) => {
          ShowNotification('error', `${error.response.data.message}`)
        })
    }
  },
  created() {
    this.getProducts()
  }
}
</script>
