<template>
  <VueLoading :active="isLoading" />
  <div
    class="my-5 position-relative banner container-fluid"
    style="background: linear-gradient(to right, #90afc5, #336b87)"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title fs-2">查詢訂單</h2>
  </div>
  <section class="mb-5">
    <div class="container">
      <nav
        aria-label="breadcrumb"
        style="--bs-breadcrumb-divider: '>'"
        class="mt-3 mb-md-4 d-flex justify-content-start"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/" class="text-dark hover-nav fw-bold">首頁</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">查詢訂單</li>
        </ol>
      </nav>
      <div class="container mt-5 search-card">
        <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
          <div class="card-body p-4 bg-light">
            <h2 class="text-center fw-bold mb-4"><i class="bi bi-search me-2"></i>查詢我的訂單</h2>

            <p class="text-body-secondary text-center small mb-4">
              請輸入您的訂單編號以查詢詳細資訊
            </p>

            <div class="input-group d-none d-md-flex mb-5">
              <span class="input-group-text bg-white border-end-0">
                <i class="bi bi-receipt"></i>
              </span>
              <input
                type="text"
                class="form-control border-start-0"
                v-model="orderId"
                placeholder="請輸入訂單編號"
              />
              <button class="btn btn-primary" @click="getSearchOrder">
                <i class="bi bi-arrow-right-circle me-1"></i>查詢
              </button>
            </div>
            <div class="d-flex flex-column gap-2 w-100 mx-auto mb-5 d-md-none">
              <input
                type="text"
                class="form-control"
                v-model="orderId"
                placeholder="請輸入訂單編號"
              />
              <button class="btn btn-primary" @click="getSearchOrder">查詢</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="order">
        <div class="my-5 row justify-content-center">
          <div class="col-lg-8">
            <div class="card border-0 rounded-4 shadow-sm mb-5">
              <div
                class="card-header rounded-4 rounded-bottom-0 bg-gradient bg-primary text-white text-center py-4"
              >
                <h4 class="mb-0"><i class="bi bi-receipt-cutoff me-2"></i>訂單資訊</h4>
              </div>

              <div class="card-body bg-light border-0 rounded-4 rounded-top-0 px-md-5 py-md-4">
                <div class="mb-4">
                  <p class="small text-body-secondary">
                    <i class="bi bi-info-circle me-1"></i>
                    訂購人資訊僅顯示姓名及電子郵件，其他資訊將不會公開
                  </p>
                  <p>
                    <strong><i class="bi bi-person me-2"></i>姓名：</strong>{{ order.user.name }}
                  </p>
                  <p>
                    <strong><i class="bi bi-envelope me-2"></i>Email：</strong
                    >{{ order.user.email }}
                  </p>
                </div>
                <div class="border border-primary rounded-4 p-4 bg-white">
                  <h5 class="mb-3 fw-bold text-primary">
                    <i class="bi bi-list-ul me-2"></i>訂單明細
                  </h5>
                  <table class="table align-middle table-borderless mb-4">
                    <thead class="text-center table-light">
                      <tr>
                        <th class="text-nowrap">行程名稱</th>
                        <th class="text-center text-nowrap">數量</th>
                        <th class="text-nowrap">價格</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in order.products" :key="item.id">
                        <td class="text-center text-primary fw-bold">{{ item.product.title }}</td>
                        <td class="text-center text-nowrap">
                          {{ item.qty }}/{{ item.product.unit }}
                        </td>
                        <td class="text-center text-nowrap">
                          {{ $format.currency(item.final_total) }}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr class="border-top">
                        <td colspan="2" class="text-end fw-bold text-nowrap">總計</td>
                        <td class="fs-5 text-primary fw-bold text-nowrap">
                          {{ $format.currency(order.total) }}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, inject } from 'vue'
import VueLoading from '@/components/VueLoading.vue'
import ShowNotification from '@/shared/swal'

export default {
  components: {
    VueLoading
  },
  setup() {
    const axios = inject('$axios')
    const orderId = ref('')
    const order = ref(null)
    const isLoading = ref(false)

    const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

    function getSearchOrder() {
      if (!orderId.value.trim()) {
        ShowNotification('error', '請輸入訂單編號')
        return
      }

      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/order/${orderId.value}`
      isLoading.value = true

      axios
        .get(url)
        .then((response) => {
          const res = response.data
          if (res.success && res.order && res.order.id) {
            order.value = res.order
            ShowNotification('success', '查詢訂單成功')
          } else {
            ShowNotification('error', res.message || '查無此訂單，請確認訂單編號')
          }
        })
        .catch((error) => {
          const status = error.response?.status
          if (status === 404) {
            ShowNotification('error', '找不到該訂單')
          } else {
            const message = error.response?.data?.message || '發生錯誤，請稍後再試'
            ShowNotification('error', message)
          }
        })
        .finally(() => {
          isLoading.value = false
        })
    }
    return {
      orderId,
      order,
      isLoading,
      getSearchOrder
    }
  }
}
</script>
