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
            <td>{{ $format.date(item.create_at) }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled text-nowrap">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-nowrap">{{ item.total }}</td>
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
  <OrderModal :order="tempOrder" ref="orderModal" @update-order="checkOrderInfo" />
  <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder" />
  <Pagination :pages="pagination" @emit-pages="getOrders" />
</template>

<script>
import { inject, ref, onMounted } from 'vue'
import VueLoading from '@/components/VueLoading.vue'
import DelModal from '@/components/DelModal.vue'
import OrderModal from '@/components/OrderModal.vue'
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
  setup() {
    const axios = inject('$axios')
    const orders = ref([])
    const isNew = ref(false)
    const pagination = ref({})
    const isLoading = ref(false)
    const tempOrder = ref({})
    const currentPage = ref(1)

    const orderModal = ref(null)
    const delModal = ref(null)

    function getOrders(currentPageParam = 1) {
      currentPage.value = currentPageParam
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/orders?page=${currentPageParam}`
      isLoading.value = true
      axios
        .get(url)
        .then((response) => {
          orders.value = response.data.orders
          pagination.value = response.data.pagination
        })
        .catch((error) => {
          const message = error.response?.data?.message || '發生錯誤，請稍後再試'
          ShowNotification('error', message)
        })
        .finally(() => {
          isLoading.value = false
        })
    }

    function openModal(item) {
      // eslint-disable-next-line no-const-assign
      tempOrder.value = { ...item }
      const orderComponent = orderModal.value
      orderComponent.showModal()
    }
    function openDelOrderModal(item) {
      // eslint-disable-next-line no-const-assign
      tempOrder.value = { ...item }
      // Object.assign(tempOrder, item)
      const delComponent = delModal.value
      delComponent.showModal()
    }
    function updatePaid(item) {
      const api = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/order/${item.id}`
      const paid = { is_paid: item.is_paid }
      isLoading.value = true
      axios
        .put(api, { data: paid })
        .then((response) => {
          if (response.data.success) {
            getOrders(currentPage.value)
            ShowNotification('success', '更新付款狀態成功')
          } else {
            ShowNotification('error', '更新付款狀態失敗')
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
    function checkOrderInfo(item) {
      const api = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/order/${item.id}`
      const paid = { is_paid: item.is_paid }
      isLoading.value = true
      const orderComponent = orderModal.value
      axios.put(api, { data: paid }).then((response) => {
        isLoading.value = false
        orderComponent.hideModal()
        if (response.data.success) {
          getOrders(currentPage.value)
          ShowNotification('success', '確認成功')
        } else {
          isLoading.value = false
          ShowNotification('error', '確認失敗')
        }
      })
    }
    function delOrder() {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/order/${tempOrder.value.id}`
      isLoading.value = true
      axios
        .delete(url)
        .then((response) => {
          const delComponent = delModal.value
          delComponent.hideModal()
          if (response.data.success) {
            ShowNotification('success', '刪除成功')
            getOrders(currentPage.value)
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
      getOrders()
    })
    return {
      orders,
      isNew,
      pagination,
      isLoading,
      tempOrder,
      currentPage,
      getOrders,
      openModal,
      openDelOrderModal,
      updatePaid,
      delOrder,
      orderModal,
      delModal,
      checkOrderInfo
    }
  }
}
</script>
