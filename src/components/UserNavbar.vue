<template>
  <div class="fixed-top">
    <div class="bg-secondary py-1">
      <div class="container">
        <Vue3Marquee class="container text-dark text-center fw-bold" :pause-on-hover="true">
          <span class="navbar-marquee">
            優惠期間結帳時輸入優惠碼<span class="text-white"> funnietravel</span>，即可享
            <span class="text-white">85</span> 折優惠 !
          </span>
          <span class="navbar-marquee">
            優惠期間結帳時輸入優惠碼<span class="text-white"> funnietravel</span>，即可享
            <span class="text-white">85</span> 折優惠 !
          </span>
        </Vue3Marquee>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div class="container">
        <RouterLink to="/" class="navbar-brand me-auto d-flex align-items-center"
          ><img src="../assets/img/logo.png" alt="funnie-logo" class="funnie-logo-img" />
          <h1 class="logo text-primary fs-2 fw-bolder mb-0 px-2 me-5">Funnie</h1></RouterLink
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse fw-bold" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center">
            <li class="nav-item">
              <RouterLink to="/about" class="nav-link">關於我們</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/products/全部" class="nav-link">行程列表</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/favorite" class="nav-link">我的最愛</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/faqs" class="nav-link">常見問題</RouterLink>
            </li>
          </ul>
          <form class="form-inline d-flex justify-content-center">
            <RouterLink to="/cart" class="nav-link text-primary hover-nav position-relative"
              >購物車<i class="bi bi-cart-fill fs-4 ps-1"></i>
              <span
                class="badge text-white bg-danger position-absolute d-flex d-none d-lg-block navbar-badge-position"
                v-if="cart.final_total > 0"
                >{{ cart.carts.length }}</span
              >
            </RouterLink>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore.js'
import { Vue3Marquee } from 'vue3-marquee'

export default {
  data() {
    return {
      collapse: {}
    }
  },
  components: {
    Vue3Marquee
  },
  methods: {
    ...mapActions(cartStore, ['getCart'])
  },
  computed: {
    ...mapState(cartStore, ['cart'])
  },
  mounted() {
    this.getCart()
  }
}
</script>
