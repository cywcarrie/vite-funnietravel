<template>
  <div
    class="my-5 position-relative banner container-fluid"
    style="background: linear-gradient(to right, #336b87, #90afc5, #336b87)"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title fs-2">我的最愛</h2>
  </div>
  <section class="mb-5">
    <div class="container">
      <nav
        aria-label="breadcrumb"
        style="--bs-breadcrumb-divider: '>'"
        class="mt-3 mb-lg-4 d-flex justify-content-start"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/" class="text-dark hover-nav fw-bold">首頁</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">我的最愛</li>
        </ol>
      </nav>
      <template v-if="isLoading">
        <VueLoading :active="true" />
      </template>
      <template v-else-if="favoriteProduct.length !== 0">
        <div class="d-flex justify-content-center mt-5">
          <h2 class="fw-bold text-dark">我的最愛清單</h2>
        </div>
        <div class="row mt-4 mb-5 bg-light rounded-4 py-3 d-lg-block d-none">
          <div class="col table-responsive mt-4 mb-4 overflow-x-hidden">
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
                    <div class="fs-5 text-black-50" v-if="!item.price">
                      TWD {{ $format.currency(item.origin_price) }}
                    </div>
                    <div>
                      <del class="fs-6 text-black-50" v-if="item.price"
                        >TWD {{ $format.currency(item.origin_price) }}
                      </del>
                      <div class="fs-5 text-dark" v-if="item.price">
                        TWD {{ $format.currency(item.price) }}
                      </div>
                    </div>
                  </td>
                  <td class="text-nowrap text-end ps-4 ps-lg-0">
                    <button
                      type="button"
                      class="btn btn-outline-primary px-4"
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
        <div class="d-block d-lg-none py-3 mt-4 mb-3">
          <div
            class="bg-light p-3 shadow-sm rounded-4 mb-3"
            v-for="item in favoriteProduct"
            :key="item.id"
          >
            <div
              class="text-primary fw-bold cursor-pointer hover-nav mb-4"
              @click="getProduct(item.id)"
            >
              <span class="">{{ item.title }}</span>
            </div>
            <div class="d-flex justify-content-end align-items-center mt-2">
              <div class="fs-5 text-black-50" v-if="!item.price">
                TWD {{ $format.currency(item.origin_price) }}
              </div>

              <del class="fs-6 text-black-50 me-2" v-if="item.price"
                >TWD {{ $format.currency(item.origin_price) }}
              </del>
              <div class="fs-5 text-dark" v-if="item.price">
                TWD {{ $format.currency(item.price) }}
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <button
                type="button"
                class="btn btn-outline-primary px-4"
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
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                :disabled="status.loadingItem === item.id"
                @click="removeFavorite(item)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end mb-5">
          <RouterLink class="btn btn-primary hover-btn" to="/cart">
            前往購物車<i class="bi bi-cart-fill ps-1"></i>
          </RouterLink>
        </div>
      </template>
      <template v-else>
        <div class="py-5 mb-5 text-center">
          <p class="fw-bold mb-5 fs-2">您尚未有行程加入我的最愛</p>
          <RouterLink class="btn btn-primary btn-lg fw-bold" to="/products/全部"
            >馬上開始瀏覽行程吧 !</RouterLink
          >
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'
import VueLoading from '@/components/VueLoading.vue'

export default {
  components: { VueLoading },
  setup() {
    const favoriteStore = useFavoriteStore()
    const cartStore = useCartStore()
    const router = useRouter()

    const { isLoading, products, favoriteProduct, favoriteData } = storeToRefs(favoriteStore)
    const { getProducts, getFavorite, removeFavorite, addFavorite } = favoriteStore
    const { cart } = storeToRefs(cartStore)
    const { addCart } = cartStore

    const status = reactive({
      loadingItem: ''
    })

    function getProduct(id) {
      router.push(`/product/${id}`)
    }

    onMounted(() => {
      getProducts(), getFavorite()
    })

    return {
      isLoading,
      products,
      favoriteProduct,
      favoriteData,
      getProducts,
      getFavorite,
      removeFavorite,
      addFavorite,
      cart,
      addCart,
      status,
      getProduct
    }
  }
}
</script>
