<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modalElement"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">優惠券</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="tempCoupon.title"
              placeholder="請輸入標題"
            />
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="tempCoupon.code"
              placeholder="請輸入優惠碼"
            />
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input type="date" class="form-control" id="due_date" v-model="due_date" />
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input
              type="number"
              class="form-control"
              id="price"
              v-model.number="tempCoupon.percent"
              placeholder="請輸入折扣百分比"
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                v-model="tempCoupon.is_enabled"
                id="is_enabled"
              />
              <label class="form-check-label" for="is_enabled"> 是否啟用 </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-primary" @click="pushCoupon">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import useModal from '@/shared/modal'

export default {
  name: 'couponModal',
  props: {
    coupon: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update-coupon'],
  setup(props, { emit }) {
    const { modalElement, showModal, hideModal } = useModal()
    const tempCoupon = ref({})
    const due_date = ref('')

    watch(
      () => props.coupon,
      (newCoupon) => {
        tempCoupon.value = { ...newCoupon }
        const dueDateTime = new Date(tempCoupon.value.due_date * 1000)
        due_date.value = dueDateTime.toISOString().split('T')[0]
      }
    )

    watch(due_date, (newDate) => {
      tempCoupon.value.due_date = Math.floor(new Date(newDate) / 1000)
    })

    function pushCoupon() {
      emit('update-coupon', tempCoupon.value)
      hideModal()
    }

    return {
      modalElement,
      showModal,
      hideModal,
      tempCoupon,
      due_date,
      pushCoupon
    }
  }
}
</script>
