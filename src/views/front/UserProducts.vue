<template>
  <VueLoading :active="isLoading" />
  <div
    class="my-5 position-relative banner container-fluid"
    style="background: linear-gradient(to right, #90afc5, #336b87)"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title fs-2">行程列表</h2>
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
              @change="sortedProducts()"
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
            <div class="col mb-4" v-for="item in products" :key="`product-${item.id}`">
              <div class="card product-card w-100 h-100">
                <RouterLink class="" :to="`/product/${item.id}`">
                  <div class="product-img cursor-pointer" @click="getProduct(item.id)">
                    <img
                      :src="item.imageUrl"
                      class="card-img-top object-fit-cover"
                      alt="allProuctsImages"
                    />
                    <span
                      class="category-text d-flex justify-content-start align-items-start text-white p-3 fw-bold"
                    >
                      <i class="bi bi-globe pe-2"></i>
                      {{ item.category }}
                    </span>
                  </div>
                  <div class="card-body p-3">
                    <h5 class="card-title fw-bolder mb-2 text-primary">{{ item.title }}</h5>
                    <div class="d-flex align-items-center mb-3 gap-2">
                      <small class="badge text-bg-light p-2 rounded-pill text-nowrap">{{
                        categoryIntro[item.category].badge1
                      }}</small>
                      <small class="badge text-bg-light p-2 rounded-pill text-nowrap">{{
                        categoryIntro[item.category].badge2
                      }}</small>
                      <small class="badge text-bg-light p-2 rounded-pill text-nowrap">{{
                        categoryIntro[item.category].badge3
                      }}</small>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                      <div class="h5 text-black-50" v-if="!item.price">
                        NTD {{ $format.currency(item.origin_price) }}
                      </div>
                      <del class="h6 text-black-50" v-if="item.price"
                        >NTD {{ $format.currency(item.origin_price) }}
                      </del>
                      <div class="h5 text-danger fw-bold" v-if="item.price">
                        <small class="text-body-secondary">NTD</small>
                        {{ $format.currency(item.price) }}
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
import { inject, ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
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
  setup() {
    const axios = inject('$axios')
    const route = useRoute()
    const router = useRouter()

    const { addCart } = useCartStore()
    const { isDone } = storeToRefs(useCartStore())
    const product = ref({})
    const products = ref([])
    const category = ref(route.params.category || '')
    const categoryIntro = ref(categoryObjectData)
    const selectPrice = ref('價格')
    const pagination = ref({})
    const isLoading = ref(false)
    const status = ref({
      loadingItem: ''
    })

    function getProducts(page = 1) {
      isLoading.value = true
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/products/all`

      axios
        .get(url)
        .then((response) => {
          if (response.data.success) {
            let allProducts = response.data.products

            if (category.value && category.value !== '全部') {
              allProducts = allProducts.filter((item) => item.category === category.value)
            }

            const perPageItem = 6
            const totalPage = Math.ceil(allProducts.length / perPageItem)
            const start = (page - 1) * perPageItem
            const end = page * perPageItem

            products.value = allProducts.slice(start, end)
            pagination.value = {
              current_page: page,
              has_next: page < totalPage,
              has_pre: page > 1,
              total_pages: totalPage
            }

            sortedProducts()
          } else {
            ShowNotification('error', response.data.message || '無法取得產品資料')
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
    function goToCategory(category) {
      router.push(`/products/${category}`)
    }
    function getProduct(id) {
      router.push(`/product/${id}`)
    }

    function sortedProducts() {
      let getSortPrice = ''
      products.value.sort((a, b) => {
        if (selectPrice.value === 'priceLowToHigh') {
          return (getSortPrice = a.price - b.price)
        } else if (selectPrice.value === 'priceHighToLow') {
          return (getSortPrice = b.price - a.price)
        }
        return getSortPrice
      })
    }
    watch(
      () => route.params.category,
      (newCategory) => {
        if (route.name === 'products') {
          category.value = newCategory
          getProducts()
        }
      }
    )
    onMounted(() => {
      getProducts()
    })

    return {
      product,
      products,
      category,
      categoryIntro,
      selectPrice,
      pagination,
      isLoading,
      status,
      getProducts,
      goToCategory,
      getProduct,
      sortedProducts,
      addCart,
      isDone
    }
  }
}
</script>
