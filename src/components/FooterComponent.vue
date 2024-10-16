<template>
  <section class="bg-primary">
    <div class="container">
      <footer class="py-5">
        <div class="row">
          <div class="col-6 col-lg-2 mb-3">
            <h5 class="text-white fw-bold">全球據點</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" @click.prevent="" class="nav-link p-0 text-white footer-icon-hover"
                  ><i class="bi bi-geo-alt-fill text-secondary"></i>新加坡</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" @click.prevent="" class="nav-link p-0 text-white footer-icon-hover"
                  ><i class="bi bi-geo-alt-fill text-secondary"></i>馬來西亞</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" @click.prevent="" class="nav-link p-0 text-white footer-icon-hover"
                  ><i class="bi bi-geo-alt-fill text-secondary"></i>泰國</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" @click.prevent="" class="nav-link p-0 text-white footer-icon-hover"
                  ><i class="bi bi-geo-alt-fill text-secondary"></i>印尼</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" @click.prevent="" class="nav-link p-0 text-white footer-icon-hover"
                  ><i class="bi bi-geo-alt-fill text-secondary"></i>南韓</a
                >
              </li>
            </ul>
          </div>

          <div class="col-6 col-lg-2 mb-3">
            <h5 class="text-white fw-bold">追蹤 Funnie</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" @click.prevent="" class="nav-link p-0 text-white footer-icon-hover"
                  ><i class="bi bi-facebook text-secondary"></i>Facebook</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" @click.prevent="" class="nav-link p-0 text-white footer-icon-hover"
                  ><i class="bi bi-instagram text-secondary"></i>Instagram</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" @click.prevent="" class="nav-link p-0 text-white footer-icon-hover"
                  ><i class="bi bi-youtube text-secondary"></i>YouTube</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" @click.prevent="" class="nav-link p-0 text-white footer-icon-hover"
                  ><i class="bi bi-twitter text-secondary"></i>Twitter</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" @click.prevent="" class="nav-link p-0 text-white footer-icon-hover"
                  ><i class="bi bi-line text-secondary"></i>Line</a
                >
              </li>
            </ul>
          </div>

          <div class="col-6 col-lg-2 mb-3">
            <h5 class="text-white fw-bold">聯絡 Funnie</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2">
                <a href="#" @click.prevent="" class="nav-link p-0 text-white footer-icon-hover"
                  ><i class="bi bi-geo-alt-fill text-secondary"></i>台北</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="tel:+886-2-1234567" class="nav-link p-0 text-white footer-icon-hover"
                  ><i class="bi bi-telephone-fill text-secondary"></i>123-4567</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="tel:+886-2-0000000" class="nav-link p-0 text-white footer-icon-hover"
                  ><i class="bi bi-telephone-fill text-secondary"></i>000-0000</a
                >
              </li>
              <li class="nav-item mb-2">
                <a href="#" @click.prevent="" class="nav-link p-0 text-white footer-icon-hover"
                  ><i class="bi bi-person-fill text-secondary"></i>9:00 - 18:00</a
                >
              </li>
            </ul>
          </div>

          <div class="col-lg-5 offset-lg-1 mb-3">
            <h5 class="text-white fw-bold">訂閱 Funnie</h5>
            <p class="text-white">訂閱我們，搶先收到最新最熱門的旅遊行程資訊！</p>
            <FormVue
              v-slot="{ errors }"
              @submit="subscribeUs"
              ref="subscribeForm"
              class="flex-fill"
            >
              <div class="input-group">
                <FieldVue
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  :class="{
                    'is-invalid': errors['email'],
                    'is-valid': !errors['email'] && subscribe.email !== ''
                  }"
                  placeholder="請輸入 Email"
                  rules="email|required"
                  v-model="subscribe.email"
                />
                <button
                  class="btn btn-secondary text-nowrap text-white rounded-end"
                  type="submit"
                  :disabled="errors['email'] || !subscribe.email"
                >
                  訂閱
                </button>
                <ErrorMessage name="email" class="invalid-feedback" />
              </div>
            </FormVue>
          </div>
        </div>

        <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p class="text-white">本網站僅供作為個人作品使用，非商業用途</p>
          <ul class="list-unstyled d-flex">
            <li class="nav-item">
              <a class="text-white" href="#" @click.prevent=""
                ><i class="bi bi-facebook footer-icon-size"></i
              ></a>
            </li>
            <li class="nav-item ms-3">
              <a class="text-white" href="#" @click.prevent=""
                ><i class="bi bi-github footer-icon-size"></i
              ></a>
            </li>
            <li class="nav-item ms-3">
              <a class="text-white" href="#" @click.prevent="goToLogin" title="管理者登入"
                ><i class="bi bi-person-circle footer-icon-size"></i
              ></a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  </section>
</template>

<script>
import ShowNotification from '@/mixins/swal'

export default {
  data() {
    return {
      subscribe: { email: '' }
    }
  },
  methods: {
    goToLogin() {
      this.$router.push('/login')
    },
    subscribeUs() {
      ShowNotification('success', '感謝您的訂閱，我們將不定時寄送優惠通知')
      this.subscribe.email = ''
      this.$refs.subscribeForm.resetForm()
    }
  }
}
</script>
