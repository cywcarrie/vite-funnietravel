<template>
  <section class="bg-primary">
    <div class="container">
      <footer class="py-5">
        <div class="row">
          <div class="col-6 col-lg-2 mb-3">
            <h5 class="text-white fw-bold">全球據點</h5>
            <ul class="nav flex-column">
              <ul class="nav flex-column">
                <li class="nav-item mb-2" v-for="location in locations" :key="location">
                  <a href="#" @click.prevent class="nav-link p-0 text-white footer-icon-hover">
                    <i class="bi bi-geo-alt-fill text-secondary"></i>{{ location }}
                  </a>
                </li>
              </ul>
            </ul>
          </div>

          <div class="col-6 col-lg-2 mb-3">
            <h5 class="text-white fw-bold">追蹤 Funnie</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2" v-for="social in socials" :key="social.name">
                <a href="#" @click.prevent class="nav-link p-0 text-white footer-icon-hover">
                  <i :class="social.iconClass"></i>{{ social.name }}
                </a>
              </li>
            </ul>
          </div>

          <div class="col-6 col-lg-2 mb-3">
            <h5 class="text-white fw-bold">聯絡 Funnie</h5>
            <ul class="nav flex-column">
              <li class="nav-item mb-2" v-for="contact in contacts" :key="contact.text">
                <a
                  :href="contact.href || '#'"
                  @click.prevent="!contact.href && $event.preventDefault()"
                  class="nav-link p-0 text-white footer-icon-hover"
                >
                  <i :class="contact.iconClass"></i>{{ contact.text }}
                </a>
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
              <a class="text-white" href="#" @click.prevent
                ><i class="bi bi-facebook footer-icon-size"></i
              ></a>
            </li>
            <li class="nav-item ms-3">
              <a class="text-white" href="#" @click.prevent
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ShowNotification from '@/shared/swal'

export default {
  setup() {
    const subscribe = ref({ email: '' })
    const subscribeForm = ref(null)
    const router = useRouter()

    const locations = ['新加坡', '馬來西亞', '泰國', '印尼', '日本']

    const socials = [
      { name: 'Facebook', iconClass: 'bi bi-facebook text-secondary' },
      { name: 'Instagram', iconClass: 'bi bi-instagram text-secondary' },
      { name: 'YouTube', iconClass: 'bi bi-youtube text-secondary' },
      { name: 'Twitter', iconClass: 'bi bi-twitter text-secondary' },
      { name: 'Line', iconClass: 'bi bi-line text-secondary' }
    ]

    const contacts = [
      { text: '台北', iconClass: 'bi bi-geo-alt-fill text-secondary' },
      {
        text: '123-4567',
        iconClass: 'bi bi-telephone-fill text-secondary',
        href: 'tel:+886-2-1234567'
      },
      {
        text: '000-0000',
        iconClass: 'bi bi-telephone-fill text-secondary',
        href: 'tel:+886-2-0000000'
      },
      { text: '9:00 - 18:00', iconClass: 'bi bi-person-fill text-secondary' }
    ]

    function goToLogin() {
      router.push('/login')
    }

    function subscribeUs() {
      ShowNotification('success', '感謝您的訂閱，我們將不定時寄送優惠通知')
      subscribe.value.email = ''
      subscribeForm.value.resetForm()
    }

    return {
      locations,
      socials,
      contacts,
      subscribe,
      subscribeForm,
      goToLogin,
      subscribeUs
    }
  }
}
</script>
