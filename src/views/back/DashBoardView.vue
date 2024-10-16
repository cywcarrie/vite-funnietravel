<template>
  <Navbar />
  <div class="container-fluid mt-3 position-relative">
    <RouterView />
  </div>
</template>

<script>
import Navbar from '@/components/AdminNavbar.vue'
import ShowNotification from '@/mixins/swal'

const { VITE_APP_API } = import.meta.env

export default {
  components: {
    Navbar
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    const api = `${VITE_APP_API}api/user/check`
    this.$http
      .post(api, this.user)
      .then((response) => {
        if (!response.data.success) {
          this.$router.push('/login')
        }
      })
      .catch((error) => {
        ShowNotification('error', `${error.response.data.message}`)
      })
  }
}
</script>
