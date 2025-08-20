<template>
  <VueLoading :active="isLoading" />
  <div class="container my-5 py-5">
    <form class="row justify-content-center py-5 px-3" @submit.prevent="signIn">
      <div class="col-md-7 col-lg-4 bg-light p-5 rounded-2">
        <h2 class="h3 mb-3 text-center text-nowrap font-weight-normal fw-bold text-primary">
          <i class="bi bi-person-circle pe-2"></i>管理者後台登入
        </h2>
        <div class="mb-2">
          <label for="inputEmail" class="visually-hidden">Email</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            v-model="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="visually-hidden">密碼</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model="user.password"
          />
        </div>
        <div class="text-center mt-4">
          <button
            class="btn btn-secondary btn-block px-4 fw-bold"
            type="submit"
            :disabled="isLoading"
          >
            登入
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { inject, ref, reactive } from 'vue'
import VueLoading from '@/components/VueLoading.vue'
import ShowNotification from '@/shared/swal'
import { useRouter } from 'vue-router'

const { VITE_APP_API } = import.meta.env

export default {
  components: {
    VueLoading
  },
  setup() {
    const axios = inject('$axios')
    const router = useRouter()
    const user = reactive({
      username: '',
      password: ''
    })
    const isLoading = ref(false)
    function signIn() {
      isLoading.value = true
      const api = `${VITE_APP_API}admin/signin`
      axios
        .post(api, user)
        .then((response) => {
          if (response.data.success) {
            const { token, expired } = response.data
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`
            axios.defaults.headers.common.Authorization = token
            ShowNotification('success', '登入成功')
            router.push('/admin/products')
          } else {
            ShowNotification('error', '登入失敗')
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
    return {
      user,
      isLoading,
      signIn
    }
  }
}
</script>
