<template>
  <VueLoading :active="isLoading" />
  <div
    class="d-flex justify-content-center align-items-center my-5 position-relative banner banner1 container-fluid"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title">行程資訊</h2>
  </div>
  <section class="mb-5">
    <div class="container">
      <nav
        aria-label="breadcrumb"
        style="--bs-breadcrumb-divider: '>'"
        class="mt-3 mb-md-4 d-flex justify-content-start d-none d-md-block"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/" class="text-dark hover-nav fw-bold">首頁</RouterLink>
          </li>
          <li class="breadcrumb-item">
            <RouterLink to="/products/全部" class="text-dark hover-nav fw-bold"
              >行程列表</RouterLink
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>
      <div class="row d-flex justify-content-center mb-5 mt-4 mt-md-0">
        <article class="col-lg-5">
          <img
            :src="product.imageUrl"
            alt="productImage"
            class="img-fluid mb-3 bg-cover bg-center rounded-2"
          />
        </article>
        <div class="col-lg-7">
          <div class="d-flex justify-content-start text-primary fw-bold">
            <p class="mb-2"><i class="bi bi-globe me-2"></i>{{ product.category }}</p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="m-0 fw-bold">{{ product.title }}</h4>
            <FavoriteBtn v-if="product.id" :productFavoriteId="product.id" />
          </div>
          <div class="d-flex align-items-center text-dark mt-2">
            <small class="border border-white bg-light px-2 py-2 rounded-pill me-2 text-nowrap"
              >2人成行</small
            >
            <small class="border border-white bg-light px-2 py-2 rounded-pill me-2 text-nowrap"
              >贈WIFI</small
            >
            <small class="border border-white bg-light px-2 py-2 rounded-pill me-2 text-nowrap"
              >多人享優惠</small
            >
          </div>
          <div class="mt-4 text-primary">
            <p class="mb-2 fw-bold"><i class="bi bi-airplane-fill pe-2"></i>台北高雄皆可出發</p>
            <p class="mb-2 fw-bold"><i class="bi bi-taxi-front-fill pe-2"></i>提供免費機場接送</p>
            <p class="mb-2 fw-bold"><i class="bi bi-check-circle-fill pe-2"></i>可以延回或是續住</p>
            <p class="fw-bold"><i class="bi bi-clock-fill pe-2"></i>24小時內確認訂單</p>
          </div>
          <div class="d-flex justify-content-end align-items-center">
            <div class="h5 text-black-50" v-if="!product.price">
              NTD {{ $format.currency(product.origin_price) }}
            </div>
            <del class="h6 text-black-50" v-if="product.price"
              >NTD {{ $format.currency(product.origin_price) }}</del
            >
            <div class="h5 ms-2 text-danger fw-bold" v-if="product.price">
              NTD {{ $format.currency(product.price) }}
            </div>
          </div>
          <div class="d-flex justify-content-end align-items-center">
            <div class="input-group mb-5 product-cart-input">
              <input
                type="number"
                class="form-control border-primary"
                v-model.number="qty"
                min="1"
              />
              <button type="button" class="btn btn-primary" @click="addCart(product.id, qty)">
                <i class="bi bi-cart-fill pe-1"></i>加入購物車
              </button>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-center bg-light py-5 my-5 rounded-2">
          <div class="col-lg-6">
            <h4 class="fw-bold text-primary"><i class="bi bi-globe pe-2"></i>行程特色</h4>
            <div class="mt-3 product-special-text" v-if="product.content">
              <template v-for="content in product.content.split('\n')" :key="content">
                {{ content }} <br />
              </template>
            </div>
          </div>
          <div class="col-lg-6 mt-4 mt-lg-0">
            <h4 class="fw-bold text-primary"><i class="bi bi-globe pe-2"></i>行程簡介</h4>
            <div class="mt-3">
              {{ product.description }}
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-center bg-white py-5 mt-2 rounded-2">
          <div class="col-lg-6">
            <h4 class="fw-bold text-primary">
              <i class="bi bi-exclamation-circle pe-2"></i>注意事項
            </h4>
            <div class="mt-3">
              <p class="mb-2">1. 本行程一經售出，不得轉讓他人使用。</p>
              <p class="mb-2">2. 本行程報價已包含機場稅與燃油附加費。</p>
              <p class="mb-2">3. 本行程報價未包含旅遊平安保險及旅遊不便險。</p>
              <p class="mb-2">4. 本行程報價未包含每日旅館客房清理及行李小費。</p>
              <p>5. 本行程未包含護照新辦及簽證費用，如有需要代辦，請洽詢專員。</p>
            </div>
          </div>
          <div class="col-lg-6 mt-4 mt-lg-0">
            <h4 class="fw-bold text-primary">
              <i class="bi bi-exclamation-circle pe-2"></i>改退行程須知
            </h4>
            <div class="mt-3">
              <p class="mb-2">1. 若欲辦理取消或是更改行程，請務必先洽詢專員。</p>
              <p class="mb-2">2. 未提前取消行程或因個人因素被拒絕入境，將無法申請退費。</p>
              <p class="mb-2">
                3. 更改行程須依航空公司之規定扣除相關費用外，公司另收取手續費每人 500 元。
              </p>
              <p class="mb-2">
                4. 取消行程須依航空公司之規定扣除相關費用外，公司另收取手續費每人 1000 元。
              </p>
              <p>5. 若遇不可抗力因素如天候異常等導致行程被迫更改或取消，公司不另收取手續費。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 bg-white">
      <div class="container">
        <h2 class="text-center fw-bolder mb-5 text-primary text-nowrap">熱門行程</h2>
        <Swiper />
      </div>
    </div>
  </section>
</template>

<script>
import { inject, ref, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import { useFavoriteStore } from '@/stores/favoriteStore'
import FavoriteBtn from '@/components/FavoriteBtn.vue'
import VueLoading from '@/components/VueLoading.vue'
import Swiper from '@/components/SwiperComponent.vue'
import ShowNotification from '@/shared/swal'
import { useRoute, useRouter } from 'vue-router'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

export default {
  components: {
    VueLoading,
    FavoriteBtn,
    Swiper
  },
  setup() {
    const axios = inject('$axios')
    const route = useRoute()
    const router = useRouter()
    const product = ref({})
    const qty = ref(1)
    const id = ref('')
    const isLoading = ref(false)
    const store = useCartStore()
    const { cart } = storeToRefs(store)
    const { addCart } = store
    const favoriteStore = useFavoriteStore()
    const { favoriteData } = storeToRefs(favoriteStore)
    const { addFavorite } = favoriteStore

    watch(
      () => route.params.productId,
      (newProductId) => {
        if (newProductId !== undefined) {
          id.value = newProductId
          getProduct()
        } else {
          ShowNotification('error', '無法獲取產品資訊')
        }
      }
    )
    function getProduct() {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/product/${id.value}`
      isLoading.value = true
      axios
        .get(url)
        .then((response) => {
          isLoading.value = false
          if (response.data.success) {
            product.value = response.data.product
          } else {
            ShowNotification('error', '無法獲取產品資訊')
            router.push('/not-found')
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

    onMounted(() => {
      id.value = route.params.productId
      getProduct()
    })

    onMounted(() => {
      getProduct()
    })

    return {
      product,
      qty,
      isLoading,
      id,
      favoriteData,
      cart,
      addCart,
      getProduct,
      addFavorite
    }
  }
}
</script>
