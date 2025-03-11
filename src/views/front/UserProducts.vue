<template>
  <VueLoading :active="isLoading" />
  <div
    class="d-flex justify-content-center align-items-center my-5 position-relative banner banner1 container-fluid"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title">行程列表</h2>
  </div>
  <section class="mb-5">
    <div class="container">
      <nav aria-label="breadcrumb" class="mt-3 mb-md-4 d-flex justify-content-start">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/" class="text-dark hover-nav fw-bold">首頁</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">行程列表</li>
        </ol>
      </nav>
      <div class="row my-5">
        <div class="col-lg-3 mb-4 mb-lg-0">
          <div class="list-group text-start">
            <button
              type="button"
              class="list-group-item list-group-item-action fw-bold"
              aria-current="true"
              :class="{ active: category === '全部' }"
              @click="goToCategory('全部')"
            >
              <i class="bi bi-globe me-2"></i>
              全部
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action fw-bold"
              :class="{ active: category === '峇里島' }"
              @click="goToCategory('峇里島')"
            >
              <i class="bi bi-globe me-2"></i>
              峇里島
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action fw-bold"
              :class="{ active: category === '泰國' }"
              @click="goToCategory('泰國')"
            >
              <i class="bi bi-globe me-2"></i>
              泰國
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action fw-bold"
              :class="{ active: category === '新加坡' }"
              @click="goToCategory('新加坡')"
            >
              <i class="bi bi-globe me-2"></i>
              新加坡
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action fw-bold"
              :class="{ active: category === '馬來西亞' }"
              @click="goToCategory('馬來西亞')"
            >
              <i class="bi bi-globe me-2"></i>
              馬來西亞
            </button>
          </div>
          <div class="ms-auto mt-3">
            <select
              class="form-select fw-bold text-primary"
              aria-label="Default select example"
              v-model="selectPrice"
              @change="sortPrice"
            >
              <option selected disabled class="fw-bold">價格</option>
              <option value="priceLowToHigh" class="fw-bold">由低至高</option>
              <option value="priceHighToLow" class="fw-bold">由高至低</option>
            </select>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="row mb-3 mb-lg-4">
            <div class="col-12">
              <div
                class="rounded products-all"
                :style="`
              background-image: linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),
              url(${categoryIntro[category].img});`"
              >
                <h2 class="text-white fw-bolder fs-1 pt-4 ps-4">{{ category }}</h2>
                <p class="text-white fw-bolder fs-5 px-4">{{ categoryIntro[category].describe }}</p>
              </div>
            </div>
          </div>
          <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3">
            <div class="col mb-4" v-for="item in products" :key="item.id">
              <div class="card product-card w-100 h-100">
                <RouterLink class="" :to="`/product/${item.id}`">
                  <div class="product-img cursor-pointer" @click="getProduct(item.id)">
                    <img
                      :src="item.imageUrl"
                      class="card-img-top object-fit-cover"
                      alt="allProuctsImages"
                    />
                    <span
                      class="seemore-text d-flex justify-content-center align-items-center text-white"
                    >
                      <i class="bi bi-search pe-1"></i>
                      查看更多
                    </span>
                  </div>
                  <div class="card-body p-3">
                    <div class="d-flex justify-content-start text-primary fw-bold">
                      <p><i class="bi bi-globe me-2"></i>{{ item.category }}</p>
                    </div>
                    <h5 class="card-title fw-bolder mb-3 text-primary">{{ item.title }}</h5>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                      <div class="h5 text-black-50" v-if="!item.price">
                        NTD {{ $filters.currency(item.origin_price) }}
                      </div>
                      <del class="h6 text-black-50" v-if="item.price"
                        >NTD {{ $filters.currency(item.origin_price) }}
                      </del>
                      <div class="h5 text-danger fw-bold" v-if="item.price">
                        NTD {{ $filters.currency(item.price) }}
                      </div>
                    </div>
                  </div>
                </RouterLink>
                <div class="card-footer border-0 bg-transparent pt-0 pb-3">
                  <button
                    type="button"
                    class="btn btn-outline-primary w-100"
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
                </div>
              </div>
            </div>
          </div>
          <Pagination :pages="pagination" @emit-pages="getProducts" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'
import Pagination from '@/components/PaginationComponent.vue'
import VueLoading from '@/components/VueLoading.vue'
import categoryObjectData from '@/data/categoryObjectData'
import ShowNotification from '@/shared/swal'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

export default {
  components: {
    VueLoading,
    Pagination
  },
  data() {
    return {
      product: {},
      products: [],
      category: '',
      categoryIntro: categoryObjectData,
      selectPrice: '價格',
      pagination: {},
      isLoading: false,
      status: {
        loadingItem: ''
      }
    }
  },
  watch: {
    $route() {
      if (this.$route.name === 'products') {
        this.category = this.$route.params.category
        this.getProducts()
      }
    }
  },
  methods: {
    ...mapActions(cartStore, ['addCart']),
    getProducts(page = 1) {
      this.isLoading = true
      let url = `${VITE_APP_API}api/${VITE_APP_PATH}/products?page=${page}`
      if (this.category !== '全部') {
        url = `${VITE_APP_API}api/${VITE_APP_PATH}/products/all`
      }
      this.$http
        .get(url)
        .then((response) => {
          if (response.data.success) {
            if (this.category !== '全部') {
              this.products = response.data.products.filter(
                (item) => item.category === this.category
              )
              const perPageItem = 5
              const totalPage = Math.ceil(this.products.length / perPageItem)
              const start = (page - 1) * perPageItem
              const end = page * perPageItem
              this.products = this.products.slice(start, end)
              this.pagination = {
                category: null,
                current_page: page,
                has_next: page < totalPage,
                has_pre: page !== 1,
                total_pages: totalPage
              }
            } else {
              this.products = response.data.products
              this.pagination = response.data.pagination
            }
          }
          this.isLoading = false
        })
        .catch((error) => {
          ShowNotification('error', `${error.response.data.message}`)
        })
    },
    goToCategory(category) {
      this.$router.push(`/products/${category}`)
    },
    getProduct(id) {
      this.$router.push(`/product/${id}`)
    },
    sortedProducts() {
      let getSortPrice = ''
      this.products.sort((a, b) => {
        if (this.selectPrice === 'priceLowToHigh') {
          return (getSortPrice = a.price - b.price)
        } else if (this.selectPrice === 'priceHighToLow') {
          return (getSortPrice = b.price - a.price)
        }
        return getSortPrice
      })
    }
  },
  computed: {
    ...mapState(cartStore, ['isDone']),
    sortPrice() {
      return this.sortedProducts()
    }
  },
  created() {
    this.category = this.$route.params.category
    this.getProducts()
  }
}
</script>
