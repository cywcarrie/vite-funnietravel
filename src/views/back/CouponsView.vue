<template>
  <div>
    <VueLoading :active="isLoading" />
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openCouponModal(true)">
        <i class="bi bi-plus-lg pe-1"></i>新增優惠券
      </button>
    </div>
    <div class="table-responsive">
      <table class="table mt-4">
        <thead>
          <tr class="table-nowrap">
            <th>名稱</th>
            <th class="text-nowrap">折扣百分比</th>
            <th>到期日</th>
            <th class="text-nowrap">是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupons" :key="`coupon ${item.id}`">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}%</td>
            <td class="text-nowrap">{{ $format.date(item.due_date) }}</td>
            <td>
              <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
              <span v-else class="text-muted">未起用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openCouponModal(false, item)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openDelCouponModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <CouponModal :coupon="tempCoupon" ref="couponModal" @update-coupon="updateCoupon" />
    <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon" />
  </div>
</template>

<script>
import { inject, ref, onMounted } from 'vue'
import VueLoading from '@/components/VueLoading.vue'
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'
import ShowNotification from '@/shared/swal'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

export default {
  components: { VueLoading, CouponModal, DelModal },
  props: {
    config: Object
  },
  setup() {
    const axios = inject('$axios')
    const coupons = ref({})
    const tempCoupon = ref({
      title: '',
      is_enabled: 0,
      percent: 100,
      code: ''
    })
    const isLoading = ref(false)
    const isNew = ref(false)
    const couponModal = ref(null)
    const delModal = ref(null)

    function openCouponModal(isNewFlag, item) {
      isNew.value = isNewFlag
      if (isNew.value) {
        tempCoupon.value.due_date = new Date().getTime() / 1000
      } else {
        // eslint-disable-next-line no-const-assign
        tempCoupon.value = { ...item }
      }
      couponModal.value.showModal()
    }
    function openDelCouponModal(item) {
      // eslint-disable-next-line no-const-assign
      tempCoupon.value = { ...item }
      const delComponent = delModal.value
      delComponent.showModal()
    }
    function getCoupons() {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/coupons`
      isLoading.value = true
      axios
        .get(url, tempCoupon.value)
        .then((response) => {
          coupons.value = response.data.coupons
        })
        .catch((error) => {
          const message = error.response?.data?.message || '發生錯誤，請稍後再試'
          ShowNotification('error', message)
        })
        .finally(() => {
          isLoading.value = false
        })
    }
    function updateCoupon(tempCoupon) {
      if (isNew.value) {
        const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/coupon`
        isLoading.value = true
        axios.post(url, { data: tempCoupon }).then((response) => {
          isLoading.value = false
          if (response.data.success) {
            ShowNotification('success', '新增優惠劵成功')
            getCoupons()
            couponModal.value.hideModal()
          } else {
            ShowNotification('error', '新增優惠劵失敗')
          }
        })
      } else {
        const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/coupon/${tempCoupon.id}`
        isLoading.value = true
        axios
          .put(url, { data: tempCoupon })
          .then((response) => {
            if (response.data.success) {
              ShowNotification('success', '更新優惠劵成功')
              getCoupons()
              couponModal.value.hideModal()
            } else {
              ShowNotification('error', '更新優惠劵失敗')
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
    }
    function delCoupon() {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/coupon/${tempCoupon.value.id}`
      isLoading.value = true
      axios
        .delete(url)
        .then((response) => {
          if (response.data.success) {
            ShowNotification('success', '刪除優惠劵成功')
            const delComponent = delModal.value
            delComponent.hideModal()
            getCoupons()
          } else {
            ShowNotification('error', '刪除優惠劵失敗')
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
      getCoupons()
    })
    return {
      coupons,
      tempCoupon,
      isLoading,
      isNew,
      couponModal,
      delModal,
      openCouponModal,
      openDelCouponModal,
      getCoupons,
      updateCoupon,
      delCoupon
    }
  }
}
</script>
