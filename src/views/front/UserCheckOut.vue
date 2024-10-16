<template>
  <VueLoading :active="isLoading" />
  <div
    class="d-flex justify-content-center align-items-center my-5 position-relative banner banner2 container-fluid"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title">結帳流程</h2>
  </div>
  <section class="mb-5">
    <div class="container">
      <div class="d-flex justify-content-center align-items-center my-5">
        <h5 class="fw-bold mb-0 text-secondary pay-header active">填寫資料</h5>
        <i class="bi bi-caret-right-fill fs-5 mx-2 text-secondary"></i>
        <h5 class="fw-bold mb-0 text-secondary pay-header">確認付款</h5>
        <i class="bi bi-caret-right-fill fs-5 mx-2 text-secondary"></i>
        <h5 class="fw-bold mb-0 text-secondary pay-header">訂單完成</h5>
      </div>
      <div class="row my-5 py-5 justify-content-center">
        <div class="col-12 col-md-8">
          <div class="col-12">
            <h3 class="text-center fw-bold mb-4">行程明細</h3>
            <div class="table-responsive-md mb-5 mb-lg-0">
              <table class="table align-middle table-borderless">
                <thead class="text-center table-secondary">
                  <tr class="table-nowrap">
                    <th>行程名稱</th>
                    <th class="text-nowrap">數量</th>
                    <th class="text-end">價格</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr class="table-nowrap" v-for="item in cart.carts" :key="item.id">
                    <td class="table-nowrap fw-bold text-primary">{{ item.product.title }}</td>
                    <td class="text-nowrap">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="text-end text-nowrap">
                      <small v-if="cart.final_total !== cart.total" class="text-success text-end"
                        >優惠價：</small
                      >
                      {{ $filters.currency(item.final_total) }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" class="text-end fs-5">總計</td>
                    <td class="text-end fs-5 text-primary fw-bold">
                      {{ $filters.currency(cart.total) }}
                    </td>
                  </tr>
                  <tr v-if="cart.final_total !== cart.total">
                    <td colspan="2" class="text-end text-success fs-5">優惠價</td>
                    <td class="text-end text-success fs-5 fw-bold">
                      {{ $filters.currency(cart.final_total) }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="col-12">
            <div class="row d-flex justify-content-center mt-5">
              <h3 class="text-center fw-bold mb-4">訂購人資訊</h3>
              <FormVue v-slot="{ errors }" @submit="createOrder" class="col-12">
                <div class="mb-3">
                  <label for="name" class="form-label"
                    >訂購人姓名<small class="ps-1 text-danger fw-bold">*</small></label
                  >
                  <FieldVue
                    id="name"
                    name="姓名"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['姓名'] }"
                    placeholder="請輸入姓名"
                    rules="required"
                    v-model="form.user.name"
                  />
                  <ErrorMessage name="姓名" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label"
                    >訂購人電子信箱<small class="ps-1 text-danger fw-bold">*</small></label
                  >
                  <FieldVue
                    id="email"
                    name="email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors['email'] }"
                    placeholder="請輸入 Email"
                    rules="email|required"
                    v-model="form.user.email"
                  />
                  <ErrorMessage name="email" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <label for="tel" class="form-label"
                    >訂購人電話<small class="ps-1 text-danger fw-bold">*</small></label
                  >
                  <FieldVue
                    id="tel"
                    name="電話"
                    type="tel"
                    class="form-control"
                    :class="{ 'is-invalid': errors['電話'] }"
                    placeholder="不含 - 符號的手機或室話"
                    rules="required|numeric|min:8|max:10"
                    v-model="form.user.tel"
                  />
                  <ErrorMessage name="電話" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label"
                    >訂購人地址<small class="ps-1 text-danger fw-bold">*</small></label
                  >
                  <FieldVue
                    id="address"
                    name="地址"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['地址'] }"
                    placeholder="請輸入地址"
                    rules="required"
                    v-model="form.user.address"
                  />
                  <ErrorMessage name="地址" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <fieldset class="col-12 d-flex flex-md-row flex-column align-md-items-center">
                    <legend class="form-label me-md-4 me-0 fs-6 fs-md-5 w-auto mb-2 mb-md-0">
                      付款方式<small class="ps-1 text-danger fw-bold">*</small>
                    </legend>
                    <div class="normal-input" :class="{ error: errors['付款方式'] }">
                      <div class="d-flex">
                        <div class="form-check form-radio me-3">
                          <FieldVue
                            class="form-check-input"
                            type="radio"
                            name="付款方式"
                            rules="required"
                            id="信用卡"
                            value="信用卡"
                            v-model="form.user.pay"
                          />
                          <label class="form-check-label" for="信用卡">信用卡</label>
                        </div>
                        <div class="form-check form-radio me-3">
                          <FieldVue
                            class="form-check-input"
                            type="radio"
                            name="付款方式"
                            rules="required"
                            id="ATM 轉帳"
                            value="ATM 轉帳"
                            v-model="form.user.pay"
                          />
                          <label class="form-check-label" for="ATM 轉帳">ATM 轉帳</label>
                        </div>
                        <div class="form-check form-radio">
                          <FieldVue
                            class="form-check-input"
                            type="radio"
                            name="付款方式"
                            rules="required"
                            id="linePay"
                            value="Line Pay"
                            v-model="form.user.pay"
                          />
                          <label class="form-check-label" for="linePay">Line Pay</label>
                        </div>
                      </div>
                      <div class="mb-2 mb-md-0">
                        <ErrorMessage
                          name="付款方式"
                          class="error-text position-absolute text-danger mb-2 mb-md-0"
                        />
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div class="mb-3" v-if="form.user.pay === '信用卡'">
                  <label for="cardNum" class="form-label"
                    >信用卡號<small class="ps-1 text-danger fw-bold">*</small></label
                  >
                  <div class="row">
                    <div class="col-12">
                      <FieldVue
                        id="cardNum"
                        name="卡號"
                        type="tel"
                        class="form-control"
                        maxlength="19"
                        :class="{ 'is-invalid': errors['卡號'] }"
                        placeholder="**** **** **** ****"
                        rules="required"
                        v-model="cardNumber"
                      />
                      <ErrorMessage name="卡號" class="invalid-feedback" />
                      <div class="my-3 col-12 col-md-6">
                        <label for="period" class="form-label required"
                          >有效日期<small class="ps-1 text-danger fw-bold">*</small></label
                        >
                        <FieldVue
                          id="period"
                          name="有效日期"
                          type="tel"
                          class="form-control"
                          placeholder="MM/YY"
                          maxlength="5"
                          v-model="expiryDate"
                          :class="{ 'is-invalid': errors['有效日期'] }"
                          rules="required"
                        />
                        <ErrorMessage name="有效日期" class="invalid-feedback" />
                      </div>
                      <div class="mb-3 col-12 col-md-6">
                        <label for="checkCode" class="form-label required"
                          >檢查碼<small class="ps-1 text-danger fw-bold">*</small></label
                        >
                        <FieldVue
                          id="checkCode"
                          name="檢查碼"
                          type="text"
                          class="form-control"
                          maxlength="3"
                          :class="{ 'is-invalid': errors['檢查碼'] }"
                          placeholder="CVC/CVV"
                          rules="required|length:3|numeric:true"
                        />
                        <ErrorMessage name="檢查碼" class="invalid-feedback" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <fieldset class="col-12 d-flex align-items-center">
                    <legend class="form-label me-4 mb-0 fs-6 fs-md-5 w-auto">
                      發票類型<small class="ps-1 text-danger fw-bold">*</small>
                    </legend>
                    <div class="normal-input" :class="{ error: errors['發票類型'] }">
                      <div class="d-flex">
                        <div class="form-check form-radio me-3">
                          <FieldVue
                            class="form-check-input"
                            type="radio"
                            name="發票類型"
                            rules="required"
                            id="紙本發票"
                            value="紙本發票"
                            v-model="form.user.bill"
                          >
                          </FieldVue>
                          <label class="form-check-label" for="紙本發票">紙本發票</label>
                        </div>
                        <div class="form-check form-radio">
                          <FieldVue
                            class="form-check-input"
                            type="radio"
                            name="發票類型"
                            rules="required"
                            id="電子載具"
                            value="電子載具"
                            v-model="form.user.bill"
                          >
                          </FieldVue>
                          <label class="form-check-label" for="電子載具">電子載具</label>
                        </div>
                      </div>
                      <ErrorMessage
                        name="發票類型"
                        class="error-text position-absolute text-danger"
                      />
                    </div>
                  </fieldset>
                </div>
                <div class="mb-3" v-if="form.user.bill === '電子載具'">
                  <FieldVue
                    name="電子載具"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors['電子載具'] }"
                    placeholder="請輸入  '/'  開頭的載具號碼"
                    rules="required"
                    v-model="form.user.billNum"
                  />
                  <ErrorMessage name="電子載具" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <label for="message" class="form-label">留言</label>
                  <textarea
                    name=""
                    id="message"
                    class="form-control"
                    cols="30"
                    rows="10"
                    v-model="form.message"
                  ></textarea>
                </div>
                <div class="d-flex justify-content-between">
                  <RouterLink class="btn btn-outline-primary" to="/cart"
                    ><i class="bi bi-caret-left-fill"></i>回上一頁</RouterLink
                  >
                  <button type="submit" class="btn btn-primary">
                    確認訂單<i class="bi bi-caret-right-fill"></i>
                  </button>
                </div>
              </FormVue>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import ShowNotification from '@/mixins/swal'
import VueLoading from '@/components/VueLoading.vue'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

export default {
  components: {
    VueLoading
  },
  data() {
    return {
      isLoading: false,
      total: 0,
      final_total: 0,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          pay: '',
          bill: '',
          billNum: ''
        },
        message: ''
      },
      coupon_code: '',
      expiryDate: '',
      cardNumber: ''
    }
  },
  watch: {
    cardNumber(newCardNumber, oldCardNumber) {
      if (
        newCardNumber.length < oldCardNumber.length &&
        newCardNumber.charAt(newCardNumber.length - 1) === ' '
      ) {
        this.cardNumber = oldCardNumber.slice(0, -2)
      }
      if (
        newCardNumber.length > oldCardNumber.length &&
        (newCardNumber.length + 1) % 5 === 0 &&
        this.cardNumber.length !== 0 &&
        this.cardNumber.length < 19
      ) {
        this.cardNumber = newCardNumber + ' '
      }
    },
    expiryDate(newExpiryDate, oldExpiryDate) {
      if (newExpiryDate.length === 2 && newExpiryDate.length > oldExpiryDate.length) {
        this.expiryDate += '/'
      } else if (
        newExpiryDate.length < oldExpiryDate.length &&
        oldExpiryDate.charAt(2) === '/' &&
        oldExpiryDate.length === 3
      ) {
        this.expiryDate = oldExpiryDate.slice(0, 1)
      }
    }
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    createOrder() {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/order`
      const order = this.form
      this.$http
        .post(url, { data: order })
        .then((response) => {
          this.$router.push(`/checkorder/${response.data.orderId}`)
          this.getCart()
        })
        .catch((error) => {
          ShowNotification('error', `${error.response.data.message}`)
        })
    }
  },
  computed: {
    ...mapState(cartStore, ['cart'])
  },
  created() {
    this.getCart()
  }
}
</script>
