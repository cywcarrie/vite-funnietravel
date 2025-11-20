<template>
  <VueLoading :active="isLoading" />
  <swiper
    class="pb-5"
    :modules="modules"
    :slides-per-view="1"
    :space-between="20"
    :pagination="{ clickable: true }"
    :breakpoints="{
      '480': {
        slidesPerView: 1.5
      },
      '576': {
        slidesPerView: 1.5
      },
      '768': {
        slidesPerView: 2
      },
      '992': {
        slidesPerView: 3
      },
      '1200': {
        slidesPerView: 4
      }
    }"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false
    }"
  >
    <swiper-slide v-for="item in products" :key="item.id">
      <RouterLink :to="`/product/${item.id}`">
        <div class="card product-card box-shadow w-100 h-100">
          <img :src="item.imageUrl" class="card-img-top object-fit-cover" alt="swiperImage" />
          <div class="card-body p-3">
            <div class="d-flex justify-content-start text-primary fw-bold">
              <p><i class="bi bi-globe me-2"></i>{{ item.category }}</p>
            </div>
            <p class="card-title fw-bolder mb-3 fs-5">{{ item.title }}</p>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="fs-5 text-dark-emphasis" v-if="!item.price">
                TWD {{ $format.currency(item.origin_price) }}
              </div>
              <del class="fs-6 text-dark-emphasis" v-if="item.price">
                TWD {{ $format.currency(item.origin_price) }}</del
              >
              <div class="fs-5 text-danger fw-bold" v-if="item.price">
                TWD {{ $format.currency(item.price) }}
              </div>
            </div>
          </div>
        </div>
      </RouterLink>
    </swiper-slide>
  </swiper>
</template>

<script>
import { inject, ref, onMounted } from 'vue'
import VueLoading from './VueLoading.vue'
import { Pagination, A11y, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

const { VITE_APP_API, VITE_APP_PATH } = import.meta.env

export default {
  components: {
    VueLoading,
    Swiper,
    SwiperSlide
  },
  setup() {
    const axios = inject('$axios')
    const isLoading = ref(false)
    const products = ref([])
    const modules = [Pagination, A11y, Autoplay]

    function getProducts() {
      const url = `${VITE_APP_API}api/${VITE_APP_PATH}/products/all`
      isLoading.value = true
      axios.get(url).then((response) => {
        isLoading.value = false
        products.value = response.data.products
        getSwiper()
      })
    }
    function getSwiper() {
      const sourceProducts = [...products.value]
      const randomSwiper = []

      for (let i = 0; i < 6 && sourceProducts.length > 0; i++) {
        const num = Math.floor(Math.random() * sourceProducts.length)
        randomSwiper.push(sourceProducts[num])
        sourceProducts.splice(num, 1)
      }

      products.value = randomSwiper
    }

    onMounted(() => {
      getProducts()
    })
    return {
      isLoading,
      products,
      modules
    }
  }
}
</script>
