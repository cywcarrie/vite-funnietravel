<template>
  <VueLoading :active="isLoading" />
  <div
    class="d-flex justify-content-center align-items-center my-5 position-relative banner banner2 container-fluid"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title">結帳流程</h2>
  </div>
  <section class="mb-5">
    <div class="container">
      <div class="d-flex justify-content-center align-items-center mb-5">
        <h5 class="fw-bold mb-0 text-secondary pay-header">填寫資料</h5>
        <i class="bi bi-caret-right-fill fs-5 mx-2 text-secondary"></i>
        <h5
          class="fw-bold mb-0 text-secondary pay-header"
          :class="{ active: order.is_paid === false }"
        >
          確認付款
        </h5>
        <i class="bi bi-caret-right-fill fs-5 mx-2 text-secondary"></i>
        <h5
          class="fw-bold mb-0 text-secondary pay-header"
          :class="{ active: order.is_paid === true }"
        >
          訂單完成
        </h5>
      </div>
      <div class="row justify-content-center align-items-center">
        <div class="col-md-10">
          <div
            class="d-flex justify-content-center align-items-center mt-5"
            v-if="order.is_paid === true"
          >
            <i class="bi bi-check-circle-fill fs-2 pe-2 text-success"></i>
            <h2 class="fw-bold mb-0 text-success">付款成功 !</h2>
          </div>
          <p class="fs-5 fw-bold mt-4 mb-5 text-center" v-if="order.is_paid === true">
            感謝您的訂購，訂單明細將會寄送至您的電子信箱 !
          </p>
          <div class="my-5 row justify-content-center">
            <h3 class="text-center fw-bold mb-4">訂單明細</h3>
            <form class="col-lg-6" @submit.prevent="payOrder">
              <table class="table align-middle table-light table-borderless mb-4">
                <thead class="text-center bg-light">
                  <tr>
                    <th class="text-nowrap">行程名稱</th>
                    <th class="text-center text-nowrap">數量</th>
                    <th class="text-nowrap">價格</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.products" :key="item.id">
                    <td class="text-center text-primary fw-bold">{{ item.product.title }}</td>
                    <td class="text-center text-nowrap">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="text-center text-nowrap">
                      {{ $format.currency(item.final_total) }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" class="text-end text-nowrap">總計</td>
                    <td class="fs-5 text-primary fw-bold text-nowrap">
                      {{ $format.currency(order.total) }}
                    </td>
                  </tr>
                </tfoot>
              </table>
              <h3 class="text-center fw-bold mb-4">訂購人資訊</h3>
              <table class="table table-light table-borderless mb-4">
                <tbody>
                  <tr class="table-nowrap">
                    <th class="text-nowrap">姓名</th>
                    <td class="text-nowrap">{{ order.user.name }}</td>
                  </tr>
                  <tr class="table-nowrap">
                    <th width="100" class="text-nowrap">Email</th>
                    <td class="text-nowrap">{{ order.user.email }}</td>
                  </tr>
                  <tr class="table-nowrap">
                    <th class="text-nowrap">電話</th>
                    <td class="text-nowrap">{{ order.user.tel }}</td>
                  </tr>
                  <tr class="table-nowrap">
                    <th>地址</th>
                    <td class="text-nowrap">{{ order.user.address }}</td>
                  </tr>
                  <tr class="table-nowrap">
                    <th>付款方式</th>
                    <td class="text-nowrap">{{ order.user.pay }}</td>
                  </tr>
                  <tr class="table-nowrap">
                    <th>付款狀態</th>
                    <td>
                      <span v-if="!order.is_paid" class="text-nowrap fw-bold text-danger"
                        >尚未付款</span
                      >
                      <span v-else class="text-success fw-bold text-nowrap">付款完成</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-end" v-if="order.is_paid === false">
                <button class="btn btn-primary ms-auto" type="submit">
                  確認付款<i class="bi bi-caret-right-fill"></i>
                </button>
              </div>
              <div class="text-end" v-if="order.is_paid === true">
                <RouterLink to="/products/全部" class="btn btn-primary ms-auto"
                  ><i class="bi bi-cart pe-1"></i>繼續選購</RouterLink
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { inject, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VueLoading from '@/components/VueLoading.vue'
import ShowNotification from '@/shared/swal'
import { RouterLink } from 'vue-router'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

export default {
  components: {
    VueLoading,
    RouterLink
  },
  setup() {
    const axios = inject('$axios')
    const route = useRoute()
    const router = useRouter()
    const order = ref({
      user: {}
    })
    const orderId = ref('')
    const isLoading = ref(false)

    function getOrder() {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/order/${orderId.value}`
      isLoading.value = true
      axios
        .get(url)
        .then((response) => {
          if (response.data.success) {
            order.value = response.data.order
          }
        })
        .catch((error) => {
          const status = error.response?.status
          if (status === 404) {
            router.push('/not-found')
          } else {
            const message = error.response?.data?.message || '發生錯誤，請稍後再試'
            ShowNotification('error', message)
          }
        })
        .finally(() => {
          isLoading.value = false
        })
    }
    function payOrder() {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/pay/${orderId.value}`
      isLoading.value = true
      axios
        .post(url)
        .then((response) => {
          if (response.data.success) {
            ShowNotification('success', '付款成功')
            getOrder()
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
      orderId.value = route.params.orderId
      if (!orderId.value) {
        router.push('/not-found')
        return
      }
      getOrder()
    })
    return {
      order,
      orderId,
      isLoading,
      getOrder,
      payOrder
    }
  }
}
</script>
