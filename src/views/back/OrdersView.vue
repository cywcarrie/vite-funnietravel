<template>
  <VueLoading :active="isLoading" />
  <div class="table-responsive">
    <table class="table mt-4">
      <thead>
        <tr class="table-nowrap">
          <th class="text-nowrap">購買時間</th>
          <th>Email</th>
          <th class="text-nowrap">購買款項</th>
          <th class="text-nowrap">應付金額</th>
          <th class="text-nowrap">是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in orders" :key="`orders ${item.id}`">
          <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
            <td>{{ $filters.date(item.create_at) }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled text-nowrap">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <label class="form-check-label text-nowrap" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openModal(item)"
                >
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openDelOrderModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <OrderModal :order="tempOrder" ref="orderModal" />
  <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder" />
  <Pagination :pages="pagination" @emit-pages="getOrders" />
</template>

<script>
import DelModal from '@/components/DelModal.vue'
import OrderModal from '@/components/OrderModal.vue'
import VueLoading from '@/components/VueLoading.vue'
import Pagination from '@/components/PaginationComponent.vue'
import ShowNotification from '@/shared/swal'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

export default {
  components: {
    VueLoading,
    Pagination,
    DelModal,
    OrderModal
  },
  data() {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1
    }
  },
  methods: {
    getOrders(currentPage = 1) {
      this.currentPage = currentPage
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/orders?page=${currentPage}`
      this.isLoading = true
      this.$http.get(url, this.tempProduct).then((response) => {
        this.orders = response.data.orders
        this.pagination = response.data.pagination
        this.isLoading = false
      })
    },
    openModal(item) {
      this.tempOrder = { ...item }
      const orderComponent = this.$refs.orderModal
      orderComponent.showModal()
    },
    openDelOrderModal(item) {
      this.tempOrder = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    updatePaid(item) {
      const api = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      this.isLoading = true
      this.$http
        .put(api, { data: paid })
        .then((response) => {
          this.isLoading = false
          if (response.data.success) {
            this.getOrders(this.currentPage)
            ShowNotification('success', '更新付款狀態成功')
          } else {
            ShowNotification('error', '更新付款狀態失敗')
          }
        })
        .catch((error) => {
          ShowNotification('error', `${error.response.data.message}`)
        })
    },
    delOrder() {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.isLoading = true
      this.$http
        .delete(url)
        .then((response) => {
          this.isLoading = false
          const delComponent = this.$refs.delModal
          delComponent.hideModal()
          if (response.data.success) {
            ShowNotification('success', '刪除成功')
            this.getOrders(this.currentPage)
          } else {
            ShowNotification('error', '刪除失敗')
          }
        })
        .catch((error) => {
          ShowNotification('error', `${error.response.data.message}`)
        })
    }
  },
  created() {
    this.getOrders()
  }
}
</script>
