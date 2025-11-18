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
          <div class="list-group text-start d-none d-md-block">
            <button
              v-for="item in categories"
              :key="'category-' + item"
              type="button"
              class="list-group-item list-group-item-action fw-bold"
              :class="{ active: category === item }"
              @click="goToCategory(item)"
            >
              <i class="bi bi-globe me-2"></i>
              {{ item }}
            </button>
          </div>
          <div class="d-block d-md-none">
            <div class="dropdown w-100">
              <button
                class="btn btn-secondary dropdown-toggle w-100 fw-bold"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                目的地
              </button>
              <ul class="dropdown-menu w-100">
                <li v-for="item in categories" :key="'dropdown-category-' + item">
                  <button
                    type="button"
                    class="dropdown-item fw-bold"
                    :class="{ active: category === item }"
                    @click="goToCategory(item)"
                  >
                    <i class="bi bi-globe me-2"></i>
                    {{ item }}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="d-flex align-items-center flex-nowrap ms-auto mt-3">
            <label class="me-2 mb-0 text-nowrap">排序：</label>
            <select
              class="form-select fw-bold"
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
                <h3 class="text-white fw-bolder fs-2 pt-4 ps-4">{{ category }}</h3>
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
                      <div class="fs-5 text-black-50" v-if="!item.price">
                        TWD {{ $format.currency(item.origin_price) }}
                      </div>
                      <del class="fs-6 text-black-50" v-if="item.price"
                        >TWD {{ $format.currency(item.origin_price) }}
                      </del>
                      <div class="fs-5 text-danger fw-bold" v-if="item.price">
                        <small class="text-body-secondary">TWD</small>
                        {{ $format.currency(item.price) }}
                      </div>
                    </div>
                  </div>
                </RouterLink>
                <div class="card-footer border-0 bg-transparent pt-0 pb-3">
                  <button
                    type="button"
                    class="btn btn-outline-primary w-100"
                    :disabled="status.loadingItem === item.id"
                    @click="addCart(item.id)"
                  >
                    <div
                      v-if="status.loadingItem === item.id"
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
import { inject, ref, reactive, onMounted, watch } from 'vue'
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
    const categories = ['全部', '峇里島', '泰國', '新加坡', '馬來西亞']
    const categoryIntro = ref(categoryObjectData)
    const selectPrice = ref('價格')
    const pagination = ref({})
    const isLoading = ref(false)
    const status = reactive({ loadingItem: '' })

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
      categories,
      selectPrice,
      pagination,
      isLoading,
      status,
      isDone,
      getProducts,
      goToCategory,
      getProduct,
      sortedProducts,
      addCart
    }
  }
}
</script>
