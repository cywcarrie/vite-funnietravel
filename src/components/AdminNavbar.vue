<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand text-white fw-bold me-auto d-flex align-items-center" href="#"
        ><img src="../assets/img/logo.png" alt="funnie-logo" class="funnie-logo-img" />
        <h1 class="logo text-primary fs-2 fw-bolder mb-0 px-2 me-5">Funnie</h1></a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink to="/admin/products" class="nav-link text-primary fw-bold hover-nav"
            >產品</RouterLink
          >
          <RouterLink to="/admin/orders" class="nav-link text-primary fw-bold hover-nav"
            >訂單</RouterLink
          >
          <RouterLink to="/admin/coupons" class="nav-link text-primary fw-bold hover-nav"
            >優惠券</RouterLink
          >
          <a href="#" @click.prevent="logout" class="nav-link text-primary fw-bold hover-nav"
            >登出</a
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import ShowNotification from '@/mixins/swal'

const { VITE_APP_API } = import.meta.env

export default {
  methods: {
    logout() {
      const api = `${VITE_APP_API}logout`
      this.$http
        .post(api, this.user)
        .then((response) => {
          if (response.data.success) {
            ShowNotification('success', '登出成功')
            this.$router.push('/login')
          } else {
            ShowNotification('error', '登出失敗')
          }
        })
        .catch((error) => {
          ShowNotification('error', `${error.response.data.message}`)
        })
    }
  }
}
</script>
