<template>
  <div
    class="my-5 position-relative banner container-fluid"
    style="background: linear-gradient(to right, #336b87, #90afc5)"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title fs-2">聯絡我們</h2>
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
          <li class="breadcrumb-item active" aria-current="page">聯絡我們</li>
        </ol>
      </nav>
      <h2 class="text-center fw-bold mt-5 mb-4">聯絡我們</h2>
      <p class="text-center mb-4">
        請填寫以下表單表達您的問題或意見，我們將會有專人於工作日回覆。<br />( 服務時間 : 週一至週五
        09:00 ~ 18:00 )
      </p>
      <div class="row justify-content-center">
        <div class="col-12 col-md-8">
          <div class="col-12">
            <div class="row d-flex justify-content-center mt-5">
              <FormVue
                v-slot="{ errors }"
                @submit="submitContactForm"
                ref="contactServiceForm"
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
                      v-model="contactForm.name"
                    />
                    <ErrorMessage name="姓名" class="invalid-feedback" />
                  </div>
                  <div class="col-md-6 mt-md-0 mt-3">
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
                      v-model="contactForm.tel"
                    />
                    <ErrorMessage name="電話" class="invalid-feedback" />
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
                    v-model="contactForm.email"
                  />
                  <ErrorMessage name="email" class="invalid-feedback" />
                </div>
                <div class="row mb-3">
                  <div class="">
                    <label class="form-label fw-bold">
                      問題類型<small class="ps-1 text-danger fw-bold">*</small>
                    </label>
                    <FieldVue
                      as="select"
                      name="問題類型"
                      class="form-select"
                      :class="{ 'is-invalid': errors['問題類型'] }"
                      rules="required"
                      v-model="contactForm.questions"
                    >
                      <option value="" selected disabled>請選擇</option>
                      <option value="旅遊產品諮詢">旅遊產品諮詢</option>
                      <option value="網站系統問題">網站系統問題</option>
                      <option value="洽談合作">洽談合作</option>
                      <option value="企業服務">企業服務</option>
                      <option value="意見回饋">意見回饋</option>
                    </FieldVue>
                    <ErrorMessage name="問題類型" class="invalid-feedback" />
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label fw-bold"
                    >問題與建議<small class="ps-1 text-danger fw-bold">*</small></label
                  >
                  <FieldVue
                    as="textarea"
                    name="問題與建議"
                    :class="{ 'is-invalid': errors['問題與建議'] }"
                    v-model="contactForm.feedback"
                    class="form-control"
                    cols="30"
                    rows="10"
                    rules="required|min:10|max:500"
                    placeholder="字數最多中文 500 字"
                  ></FieldVue>
                  <ErrorMessage name="問題與建議" class="invalid-feedback" />
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
    const contactServiceForm = ref(null)
    const contactForm = reactive({
      name: '',
      email: '',
      tel: '',
      questions: '',
      feedback: ''
    })
    function submitContactForm() {
      ShowNotification('success', '感謝您的提交，專人將儘速與您聯繫')
      Object.assign(contactForm, {
        name: '',
        email: '',
        tel: '',
        questions: '',
        feedback: ''
      })
      contactServiceForm.value.resetForm()
    }

    return {
      contactForm,
      contactServiceForm,
      submitContactForm
    }
  }
}
</script>
