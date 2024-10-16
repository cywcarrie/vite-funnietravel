<template>
  <div>
    <VueLoading :active="isLoading" />
    <div class="text-end mt-4">
      <button class="btn btn-primary" type="button" @click="openCouponModal(true)">
        <i class="bi bi-plus-lg pe-1"></i>新增優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="`coupon ${item.id}`">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
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
    <couponModal :coupon="tempCoupon" ref="couponModal" @update-coupon="updateCoupon" />
    <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon" />
  </div>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'
import VueLoading from '@/components/VueLoading.vue'
import ShowNotification from '@/mixins/swal'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

export default {
  components: { VueLoading, CouponModal, DelModal },
  props: {
    config: Object
  },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isLoading: false,
      isNew: false
    }
  },
  methods: {
    openCouponModal(isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.showModal()
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    getCoupons() {
      this.isLoading = true
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/coupons`
      this.$http.get(url, this.tempProduct).then((response) => {
        this.coupons = response.data.coupons
        this.isLoading = false
      })
    },
    updateCoupon(tempCoupon) {
      if (this.isNew) {
        const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/coupon`
        this.$http.post(url, { data: tempCoupon }).then((response) => {
          if (response.data.success) {
            ShowNotification('success', '新增優惠券成功')
            this.getCoupons()
            this.$refs.couponModal.hideModal()
          } else {
            ShowNotification('error', '新增優惠券失敗')
          }
        })
      } else {
        const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        this.$http
          .put(url, { data: this.tempCoupon })
          .then((response) => {
            if (response.data.success) {
              ShowNotification('success', '更新優惠券成功')
              this.getCoupons()
              this.$refs.couponModal.hideModal()
            } else {
              ShowNotification('error', '新增優惠券失敗')
            }
          })
          .catch((error) => {
            ShowNotification('error', `${error.response.data.message}`)
          })
      }
    },
    delCoupon() {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.isLoading = true
      this.$http
        .delete(url)
        .then((response) => {
          if (response.data.success) {
            ShowNotification('success', '刪除優惠券成功')
            const delComponent = this.$refs.delModal
            delComponent.hideModal()
            this.getCoupons()
          } else {
            ShowNotification('error', '刪除優惠券失敗')
          }
        })
        .catch((error) => {
          ShowNotification('error', `${error.response.data.message}`)
        })
    }
  },
  created() {
    this.getCoupons()
  }
}
</script>
