<template>
  <div
    class="my-5 position-relative banner container-fluid"
    style="background: linear-gradient(to right, #336b87, #90afc5)"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title fs-2">客製旅遊</h2>
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
          <li class="breadcrumb-item active" aria-current="page">客製旅遊</li>
        </ol>
      </nav>
      <h2 class="text-center fw-bold text-primary mt-5">自訂行程，專屬您的旅遊體驗</h2>
      <p class="fw-bold text-center mb-4">請留下您的需求與聯絡方式，我們將會有專人為您服務</p>
      <div class="row justify-content-center">
        <div class="col-12 col-md-8">
          <div class="col-12">
            <div class="row d-flex justify-content-center mt-5">
              <h3 class="text-center fw-bold mb-4">客製化旅遊行程</h3>
              <FormVue
                v-slot="{ errors }"
                @submit="submitCustomTour"
                ref="customTourForm"
                class="col-12"
              >
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="name" class="form-label fw-bold"
                      >聯絡人姓名<small class="ps-1 text-danger fw-bold">*</small></label
                    >
                    <FieldVue
                      id="name"
                      name="姓名"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors['姓名'] }"
                      placeholder="請輸入姓名"
                      rules="required"
                      v-model="customForm.name"
                    />
                    <ErrorMessage name="姓名" class="invalid-feedback" />
                  </div>
                  <div class="col-md-6 mt-md-0 mt-3">
                    <label class="form-label fw-bold">性別</label>
                    <select v-model="customForm.sex" class="form-select" required>
                      <option value="" selected disabled>請選擇</option>
                      <option value="男">男</option>
                      <option value="女">女</option>
                      <option value="非二元性別 / 其他">非二元性別 / 其他</option>
                      <option value="不願透露">不願透露</option>
                    </select>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label fw-bold"
                    >電子信箱<small class="ps-1 text-danger fw-bold">*</small></label
                  >
                  <FieldVue
                    id="email"
                    name="email"
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors['email'] }"
                    placeholder="請輸入 Email"
                    rules="email|required"
                    v-model="customForm.email"
                  />
                  <ErrorMessage name="email" class="invalid-feedback" />
                </div>
                <div class="mb-3">
                  <label for="tel" class="form-label fw-bold"
                    >聯絡電話<small class="ps-1 text-danger fw-bold">*</small></label
                  >
                  <FieldVue
                    id="tel"
                    name="電話"
                    type="tel"
                    class="form-control"
                    :class="{ 'is-invalid': errors['電話'] }"
                    placeholder="不含 - 符號的手機或室話"
                    rules="required|numeric|min:8|max:10"
                    v-model="customForm.tel"
                  />
                  <ErrorMessage name="電話" class="invalid-feedback" />
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label class="form-label fw-bold">
                      旅遊國家<small class="ps-1 text-danger fw-bold">*</small>
                    </label>
                    <FieldVue
                      as="select"
                      name="旅遊國家"
                      class="form-select"
                      :class="{ 'is-invalid': errors['旅遊國家'] }"
                      rules="required"
                      v-model="customForm.country"
                    >
                      <option value="" selected disabled>請選擇目的地</option>
                      <option value="新加坡">新加坡</option>
                      <option value="馬來西亞">馬來西亞</option>
                      <option value="泰國">泰國</option>
                      <option value="峇里島">峇里島</option>
                    </FieldVue>
                    <ErrorMessage name="旅遊國家" class="invalid-feedback" />
                  </div>
                  <div class="col-md-6 mt-md-0 mt-3">
                    <label class="form-label fw-bold">旅遊人數</label>
                    <input
                      v-model.number="customForm.travelers"
                      type="number"
                      min="1"
                      class="form-control"
                      placeholder="大人和小孩皆計算一人"
                    />
                    <small class="form-text text-muted">(大人、小孩皆計算一人)</small>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label class="form-label fw-bold">出發日期</label>
                    <input
                      v-model="customForm.startDate"
                      type="date"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="col-md-6 mt-md-0 mt-3">
                    <label class="form-label fw-bold">返回日期</label>
                    <input v-model="customForm.endDate" type="date" class="form-control" required />
                  </div>
                </div>
                <fieldset class="mb-3">
                  <legend class="col-form-label pt-0 fw-bold">需求屬性</legend>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                      v-model="customForm.tourType"
                    />
                    <label class="form-check-label" for="inlineRadio1">個人旅遊</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="option2"
                      v-model="customForm.tourType"
                    />
                    <label class="form-check-label" for="inlineRadio2">家族旅遊</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio3"
                      value="option3"
                      v-model="customForm.tourType"
                    />
                    <label class="form-check-label" for="inlineRadio3">員工旅遊</label>
                  </div>
                </fieldset>
                <div class="mb-3">
                  <label class="form-label fw-bold">旅遊偏好 / 特別需求</label>
                  <textarea
                    v-model="customForm.preferences"
                    class="form-control"
                    rows="3"
                    placeholder="例如：慶生、蜜月、親子、美食..."
                  ></textarea>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-primary px-4">確定送出</button>
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
import { ref, reactive } from 'vue'
import ShowNotification from '@/shared/swal'

export default {
  setup() {
    const customTourForm = ref(null)
    const customForm = reactive({
      name: '',
      sex: '',
      email: '',
      tel: '',
      country: '',
      startDate: '',
      endDate: '',
      tourType: '',
      travelers: 1,
      preferences: ''
    })
    function submitCustomTour() {
      ShowNotification('success', '感謝您的提交，專人將儘速與您聯繫')
      Object.assign(customForm, {
        name: '',
        sex: '',
        email: '',
        tel: '',
        country: '',
        startDate: '',
        endDate: '',
        tourType: '',
        travelers: 1,
        preferences: ''
      })
      customTourForm.value.resetForm()
    }

    return {
      customForm,
      customTourForm,
      submitCustomTour
    }
  }
}
</script>
