<template>
  <VueLoading :active="isLoading" />
  <div
    class="my-5 position-relative banner container-fluid"
    style="background: linear-gradient(to right, #90afc5, #336b87)"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title fs-2">購物車</h2>
  </div>
  <section class="cart-section mb-5">
    <div class="container">
      <nav
        aria-label="breadcrumb"
        style="--bs-breadcrumb-divider: '>'"
        class="mt-3 mb-4 d-flex justify-content-start"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/" class="text-dark hover-nav fw-bold">首頁</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">購物車</li>
        </ol>
      </nav>

      <template v-if="cart.total !== 0">
        <div class="row g-4">
          <div class="col-lg-8">
            <div class="text-center mb-5">
              <h2 class="fw-bold text-dark">購物車清單</h2>
            </div>

            <div class="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
              <RouterLink class="btn btn-outline-primary" to="/products/全部">
                <i class="bi bi-cart pe-1"></i> 繼續選購
              </RouterLink>
              <button type="button" class="btn btn-outline-danger" @click="deleteAllCart">
                <i class="bi bi-trash3 pe-1"></i> 清空購物車
              </button>
            </div>
            <div class="bg-light p-3 shadow-sm rounded-4 d-none d-lg-block">
              <div class="table-responsive overflow-x-hidden">
                <table
                  class="table align-middle text-center table-light table-borderless cart-table"
                >
                  <thead class="table-secondary">
                    <tr>
                      <th>行程名稱</th>
                      <th>數量</th>
                      <th class="text-end">單價</th>
                      <th class="text-end">小計</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in cart.carts" :key="item.id">
                      <td
                        class="text-primary fw-bold cursor-pointer hover-nav"
                        @click="getProduct(item.product_id)"
                      >
                        <span class="text-wrap">{{ item.product.title }}</span>
                      </td>
                      <td>
                        <div class="d-flex justify-content-center">
                          <div class="input-group input-group-sm cart-qty">
                            <input
                              type="number"
                              class="form-control"
                              min="1"
                              @change="updateCart(item)"
                              v-model.number="item.qty"
                            />
                            <div class="input-group-text">/ {{ item.product.unit }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="text-end text-nowrap">
                        {{ $format.currency(item.product.price) }}
                      </td>
                      <td class="text-end text-nowrap">
                        <small v-if="cart.final_total !== cart.total" class="text-success"
                          >優惠價：</small
                        >
                        {{ $format.currency(item.final_total) }}
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm"
                          @click="removeCartItem(item.id)"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="d-block d-lg-none">
            <div
              class="bg-white p-3 shadow-sm rounded-4 mb-3 border border-light-subtle"
              v-for="item in cart.carts"
              :key="item.id"
            >
              <div
                class="text-primary fw-bold cursor-pointer hover-nav mb-1"
                @click="getProduct(item.product_id)"
              >
                {{ item.product.title }}
              </div>

              <div class="mt-3 mb-2 d-flex justify-content-end">
                <div class="input-group input-group-sm cart-qty">
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    @change="updateCart(item)"
                    v-model.number="item.qty"
                  />
                  <div class="input-group-text">/ {{ item.product.unit }}</div>
                </div>
              </div>

              <div class="d-flex justify-content-between align-items-center">
                <div class="text-end text-nowrap">
                  <small>單價：</small>{{ $format.currency(item.product.price) }}
                </div>
                <div>
                  <small v-if="cart.final_total !== cart.total" class="text-success"
                    >優惠價：</small
                  >
                  <small v-else>小計：</small>
                  {{ $format.currency(item.final_total) }}
                </div>
              </div>
              <div class="d-flex justify-content-end align-items-center mt-3">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.id)"
                >
                  <i class="bi bi-trash pe-1"></i>刪除
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div
              class="bg-light p-4 rounded-4 shadow-sm h-100 d-flex flex-column justify-content-between"
            >
              <div>
                <div class="text-dark fw-bold mb-3">
                  <i class="bi bi-globe pe-2"></i>
                  結帳前輸入優惠碼 &#12300;<span class="text-primary">funnietravel</span
                  >&#12301;，即可享有 <span class="text-primary">85</span> 折限時優惠
                </div>

                <button
                  @click="copyCouponCode"
                  class="btn btn-outline-primary w-100 mb-3"
                  type="button"
                >
                  <i class="bi bi-clipboard-fill pe-1"></i> 複製優惠碼
                </button>
              </div>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control border-primary"
                  v-model="coupon_code"
                  placeholder="請輸入優惠碼"
                />
                <button class="btn btn-primary" type="button" @click="addCouponCode(coupon_code)">
                  套用
                </button>
              </div>

              <div class="mt-4">
                <div class="d-flex justify-content-between">
                  <span class="fs-5">總計</span>
                  <span class="fs-5 fw-bold text-primary">{{ $format.currency(cart.total) }}</span>
                </div>
                <div
                  class="d-flex justify-content-between text-success mt-2"
                  v-if="cart.final_total !== cart.total"
                >
                  <span class="fs-6">優惠價</span>
                  <span class="fs-6 fw-bold">{{ $format.currency(cart.final_total) }}</span>
                </div>
                <RouterLink to="/checkout" class="btn btn-primary w-100 mt-4">
                  前往結帳 <i class="bi bi-caret-right-fill"></i>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="py-5 mb-5 text-center">
          <h2 class="fw-bolder mb-5">您尚未有行程加入購物車</h2>
          <RouterLink class="btn btn-primary btn-lg fw-bold" to="/products/全部">
            馬上開始選購吧 !
          </RouterLink>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import VueLoading from '@/components/VueLoading.vue'

export default {
  components: {
    VueLoading
  },
  setup() {
    const {
      getCart,
      updateCart,
      removeCartItem,
      deleteAllCart,
      getProduct,
      addCouponCode,
      copyCouponCode
    } = useCartStore()
    const { carts, total, final_total, cart, isLoading } = storeToRefs(useCartStore())

    const coupon_code = ref('')

    onMounted(() => {
      getCart()
    })

    return {
      carts,
      total,
      final_total,
      cart,
      isLoading,
      coupon_code,
      getCart,
      updateCart,
      removeCartItem,
      deleteAllCart,
      getProduct,
      addCouponCode,
      copyCouponCode
    }
  }
}
</script>
