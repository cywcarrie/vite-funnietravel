<template>
  <VueLoading :active="isLoading" />
  <div
    class="my-5 position-relative banner container-fluid"
    style="background: linear-gradient(to right, #a8dadc, #457b9d)"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title fs-2">行程資訊</h2>
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
            <h3 class="m-0 fw-bold fs-4">{{ product.title }}</h3>
            <FavoriteBtn v-if="product.id" :productFavoriteId="product.id" />
          </div>
          <div class="d-flex align-items-center mt-2 gap-2">
            <small
              class="badge border border-dark-emphasis text-bg-light p-2 rounded-pill text-nowrap"
              >2人成行</small
            >
            <small
              class="badge border border-dark-emphasis text-bg-light p-2 rounded-pill text-nowrap"
              >贈上網卡</small
            >
            <small
              class="badge border border-dark-emphasis text-bg-light p-2 rounded-pill text-nowrap"
              >中文導遊</small
            >
            <small
              class="badge border border-dark-emphasis text-bg-light p-2 rounded-pill text-nowrap"
              >限時優惠</small
            >
          </div>
          <div class="mt-4 text-primary">
            <p class="mb-2 fw-bold"><i class="bi bi-airplane-fill pe-2"></i>台北高雄皆可出發</p>
            <p class="mb-2 fw-bold"><i class="bi bi-map-fill pe-2"></i>可客製化行程內容</p>
            <p class="mb-2 fw-bold"><i class="bi bi-check-circle-fill pe-2"></i>可以延回或是續住</p>
            <p class="fw-bold"><i class="bi bi-clock-fill pe-2"></i>24小時內確認訂單</p>
          </div>
          <div class="d-flex justify-content-end align-items-center">
            <div class="fs-6 text-dark-emphasis text-decoration-line-through" v-if="product.price">
              TWD {{ $format.currency(product.origin_price) }}
            </div>
            <div class="fs-5 ms-2 text-danger fw-bold" v-if="product.price">
              TWD {{ $format.currency(product.price) }}
            </div>
            <div class="fs-5 text-dark-emphasis" v-else>
              TWD {{ $format.currency(product.origin_price) }}
            </div>
          </div>
          <div class="d-flex justify-content-end align-items-center">
            <div class="input-group mb-5 product-cart-input">
              <label for="qty" class="visually-hidden">數量</label>
              <input
                id="qty"
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
            <div class="mt-3 content-text">
              {{ product.description }}
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-center py-5 mt-2 rounded-2">
          <div class="col-lg-6">
            <h4 class="fw-bold text-primary">
              <i class="bi bi-exclamation-circle pe-2"></i>注意事項
            </h4>
            <ul class="mt-3">
              <li v-for="(item, index) in notices" :key="`notice-${index}`" class="mb-2">
                {{ item }}
              </li>
            </ul>
          </div>
          <div class="col-lg-6 mt-4 mt-lg-0">
            <h4 class="fw-bold text-primary">
              <i class="bi bi-exclamation-circle pe-2"></i>改退行程須知
            </h4>
            <ul class="mt-3">
              <li v-for="(item, index) in refundRules" :key="`refund-${index}`" class="mb-2">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <div class="row d-flex justify-content-center py-5 mt-2 rounded-2">
          <div class="col-lg-6">
            <h4 class="fw-bold text-primary"><i class="bi bi-ui-checks pe-2"></i>報名流程</h4>
            <ol class="mt-3">
              <li v-for="(step, index) in signupSteps" :key="`step-${index}`" class="mb-2">
                {{ step }}
              </li>
            </ol>
          </div>
          <div class="col-lg-6 mt-4 mt-lg-0">
            <h4 class="fw-bold text-primary">
              <i class="bi bi-people-fill pe-2"></i>出團與服務說明
            </h4>
            <ul class="mt-3">
              <li v-for="(item, index) in serviceInfo" :key="`serviceinfo-${index}`" class="mb-2">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="py-5">
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
    const { addCart } = store
    const favoriteStore = useFavoriteStore()
    const { favoriteData } = storeToRefs(favoriteStore)
    const { addFavorite } = favoriteStore

    const notices = [
      '本行程一經售出，不得轉讓他人使用。',
      '本行程報價已包含兩地機場稅與燃油附加費。',
      '本行程報價已包含每人一張不限流量上網卡。',
      '本行程報價未包含旅遊平安保險與旅遊不便險。',
      '本行程報價未包含每日旅館客房清理及行李小費。',
      '本行程報價未包含旅客自行於當地消費所產生之費用。',
      '本行程報價未包含護照申辦及簽證費用，如需代辦服務，請洽詢專員。'
    ]

    const refundRules = [
      '若欲辦理取消或是更改行程，請務必先洽詢專員。',
      '未提前取消行程或因個人因素被拒絕入境，將無法申請退費。',
      '訂單成立後，更改或取消行程，除須依各航空公司之規定收取相關費用外，本公司將另收取相應之手續費。',
      '訂單成立後，更改或取消行程，其手續費或罰金將依各飯店回覆之金額為準。本公司將另收取相應之手續費。',
      '若遇不可抗力因素如天候異常等導致行程被迫更改或取消，公司將不另收取任何手續費。'
    ]

    const signupSteps = [
      '選擇欲參加之行程與人數，加入購物車',
      '完成訂單填寫並送出付款',
      '客服人員將於 24 小時內聯繫確認訂單內容',
      '行前提供完整出團資料與注意事項',
      '依行程日期準時集合出發'
    ]

    const serviceInfo = [
      '本行程採小團出發，最低 2 人即可成行。',
      '實際出團人數與交通工具將依當團人數安排。',
      '行程可能因天候、交通或不可抗力因素進行調整。',
      '如遇不可抗力因素導致行程異動，將以旅客權益為優先考量。',
      '客服服務時間為週一至週五 09:00 ~ 18:00。'
    ]

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
      notices,
      refundRules,
      signupSteps,
      serviceInfo,
      addCart,
      getProduct,
      addFavorite
    }
  }
}
</script>
