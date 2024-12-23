<template>
  <VueLoading :active="isLoading" />
  <div
    class="d-flex justify-content-center align-items-center my-5 position-relative banner banner1 container-fluid"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title">我的最愛</h2>
  </div>
  <section class="mb-5">
    <div class="container">
      <a href="#" title="回上一頁" class="text-secondary fw-bold" @click.prevent="$router.go(-1)"
        ><i class="bi bi-arrow-left-square-fill fs-2"></i
      ></a>
      <nav aria-label="breadcrumb" class="mt-3 mb-md-4 d-flex justify-content-start">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/" class="text-dark hover-nav fw-bold">首頁</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">我的最愛</li>
        </ol>
      </nav>
      <template v-if="favoriteProduct.length !== 0">
        <div class="d-flex justify-content-center mt-5">
          <h2 class="fw-bold">我的最愛清單</h2>
        </div>
        <div class="row mt-4 mb-5 bg-light rounded-2 py-3">
          <div class="col table-responsive mt-4 mb-4">
            <table class="table align-middle text-center table-light table-borderless">
              <thead class="table-secondary">
                <tr>
                  <th></th>
                  <th class="text-nowrap">行程名稱</th>
                  <th class="text-nowrap">價格</th>
                  <th></th>
                  <th class="text-end"></th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr class="table-nowrap" v-for="item in favoriteProduct" :key="item.id">
                  <td class="favorite-table">
                    <div
                      class="m-auto rounded-2 favorite-table-img"
                      :style="{ backgroundImage: `url(${item.imageUrl})` }"
                    ></div>
                  </td>
                  <td
                    class="text-nowrap fw-bold text-primary cursor-pointer hover-nav"
                    @click="getProduct(item.id)"
                  >
                    {{ item.title }}
                  </td>
                  <td class="text-nowrap">
                    <div class="h5 text-black-50" v-if="!item.price">
                      NTD {{ $filters.currency(item.origin_price) }}
                    </div>
                    <del class="h6 text-black-50" v-if="item.price"
                      >NTD {{ $filters.currency(item.origin_price) }}
                    </del>
                    <div class="h5 text-black" v-if="item.price">
                      NTD {{ $filters.currency(item.price) }}
                    </div>
                  </td>
                  <td class="text-nowrap text-end ps-4 ps-lg-0">
                    <button
                      type="button"
                      class="btn btn-outline-primary px-4"
                      :disabled="this.status.loadingItem === item.id"
                      @click="addCart(item.id)"
                    >
                      <div
                        v-if="this.status.loadingItem === item.id"
                        class="spinner-border text-primary spinner-border-sm"
                        role="status"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                      <i class="bi bi-cart-fill"></i>
                      加入購物車
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      :disabled="status.loadingItem === item.id"
                      @click="removeFavorite(item)"
                    >
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="text-end mt-4 mb-5">
          <RouterLink class="btn btn-primary ms-auto text-end hover-btn" to="/cart"
            >前往購物車<i class="bi bi-cart-fill ps-1"></i
          ></RouterLink>
        </div>
      </template>
      <template v-else>
        <div class="py-5 mb-5">
          <div class="text-center pt-4">
            <h2 class="fw-bold mb-5">您尚未有行程加入我的最愛</h2>
            <RouterLink class="btn btn-primary btn-lg fw-bold" to="/products/全部"
              >馬上開始瀏覽行程吧 !</RouterLink
            >
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import favoriteStore from '@/stores/favoriteStore'
import cartStore from '@/stores/cartStore'
import VueLoading from '@/components/VueLoading.vue'

export default {
  components: {
    VueLoading
  },
  data() {
    return {
      status: {
        loadingItem: ''
      }
    }
  },
  methods: {
    ...mapActions(cartStore, ['addCart']),
    ...mapActions(favoriteStore, ['getProducts', 'getFavorite', 'removeFavorite']),
    getProduct(id) {
      this.$router.push(`/product/${id}`)
    }
  },
  computed: {
    ...mapState(favoriteStore, ['isLoading', 'products', 'favoriteProduct', 'favoriteData']),
    ...mapState(cartStore, ['cart'])
  },
  created() {
    this.getProducts()
  }
}
</script>
