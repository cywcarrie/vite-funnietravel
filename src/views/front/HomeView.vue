<template>
  <section>
    <div class="home d-flex justify-content-center align-items-center position-relative">
      <div
        class="text-center text-light home-content border"
        data-aos="fade-down"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-delay="50"
      >
        <h2 class="mb-3 fw-bolder fs-1 text-nowrap">探索美麗的東南亞</h2>
        <p class="text-nowrap fs-4"><span class="fw-bold fs-2">Funnie</span> 給您輕鬆快樂的旅行</p>
      </div>
      <div
        class="d-flex flex-column align-items-center text-white mt-5 pt-5 more position-absolute"
        data-aos="fade-down"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-delay="50"
      >
        <RouterLink
          class="btn fw-bold px-5 py-2 rounded-0 border border-white home-first-btn"
          to="/products/全部"
          >瀏覽行程</RouterLink
        >
      </div>
    </div>
    <div class="py-5">
      <div class="container py-3">
        <h2 class="text-center fw-bolder mb-5 text-primary text-nowrap">選擇我們的好處</h2>
        <div class="row">
          <div class="col-lg-4 text-center p-0" data-aos="zoom-in" data-aos-duration="1000">
            <div class="shadow m-2 py-2">
              <i class="bi bi-people-fill m-2 text-primary fs-1"></i>
              <div>
                <h3 class="m-2 fw-bold">優質的旅遊行程</h3>
                <p class="m-2 home-second-text">所有行程皆為本公司專業團隊設計</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 text-center p-0" data-aos="zoom-in" data-aos-duration="1000">
            <div class="shadow m-2 py-2">
              <i class="bi bi-person-check-fill m-2 text-primary fs-1"></i>
              <div>
                <h3 class="m-2 fw-bold">專業導遊同行</h3>
                <p class="m-2 home-second-text">專業導遊全程同行讓您的旅程不再走馬看花</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 text-center p-0" data-aos="zoom-in" data-aos-duration="1000">
            <div class="shadow m-2 py-2">
              <i class="bi bi-cash-coin m-2 text-primary fs-1"></i>
              <div>
                <h3 class="m-2 fw-bold">合理的價格</h3>
                <p class="m-2 home-second-text">以合理的價格享受優質旅遊體驗</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-5 about" id="about">
      <div class="container py-3">
        <h2 class="text-center fw-bolder mb-5 text-secondary text-nowrap">關於 Funnie Travel</h2>
        <div class="text-center text-white px-3 px-md-5">
          <h3 class="fw-bolder mb-4">東南亞旅行專家</h3>
          <p class="fs-5">
            是由一群來自台灣各地熱愛旅行，熱愛東南亞的專業團隊所組成，共同致力於提供客戶最優質、專業且安全的旅遊行程，讓您能放心享受每一段旅程，體驗旅行的純粹美好。我們深信旅行是最能貼近在地生活、深入探索當地文化與風土人情的方式。期望每一位熱愛旅行的您，都能與我們一樣，從每一次出發中，感受到世界的精彩與感動。
          </p>
        </div>
        <div class="text-center pt-3">
          <RouterLink class="btn btn-outline-secondary fw-bold home-about-btn" to="/about"
            >關於我們</RouterLink
          >
        </div>
      </div>
    </div>
    <div class="py-5">
      <div class="container py-3">
        <h2 class="text-center fw-bolder mb-5 text-primary text-nowrap">選擇想去的地方</h2>
        <div class="row justify-content-center">
          <div class="col-lg-3 col-md-6">
            <RouterLink
              to="/products/新加坡"
              class="mb-2 mb-lg-0 homebtn-img homebtn-img1 d-flex align-items-center justify-content-center rounded-2"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <h3 class="text-center text-white position-absolute">
                新加坡<br />
                Singapore
              </h3>
            </RouterLink>
          </div>
          <div class="col-lg-3 col-md-6">
            <RouterLink
              to="/products/馬來西亞"
              class="mb-2 mb-lg-0 homebtn-img homebtn-img2 d-flex align-items-center justify-content-center rounded-2"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <h3 class="text-center text-white position-absolute">
                馬來西亞<br />
                Malaysia
              </h3>
            </RouterLink>
          </div>
          <div class="col-lg-3 col-md-6">
            <RouterLink
              to="/products/泰國"
              class="mb-2 mb-lg-0 homebtn-img homebtn-img3 d-flex align-items-center justify-content-center rounded-2"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <h3 class="text-center text-white position-absolute">
                泰國<br />
                Thailand
              </h3>
            </RouterLink>
          </div>
          <div class="col-lg-3 col-md-6">
            <RouterLink
              to="/products/峇里島"
              class="homebtn-img homebtn-img4 d-flex align-items-center justify-content-center rounded-2"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <h3 class="text-center text-white position-absolute">
                峇里島<br />
                Bali
              </h3>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="py-5">
      <div class="container py-3">
        <h2 class="text-center fw-bolder mb-5 text-primary text-nowrap">熱門行程推薦</h2>
        <Swiper />
        <div class="text-end">
          <RouterLink to="/products/全部" class="btn btn-sm btn-outline-primary">
            更多行程<i class="bi bi-caret-right-fill ps-1"></i>
          </RouterLink>
        </div>
      </div>
    </div>
    <div class="py-5 bg-light">
      <div class="container py-3">
        <h2 class="text-center fw-bolder mb-5 text-primary text-nowrap">服務專區</h2>
        <div class="row justify-content-center">
          <div class="col-lg-4">
            <RouterLink
              to="/transfer"
              class="mb-2 mb-lg-0 d-flex align-items-center justify-content-center rounded-2 border border-primary py-3"
            >
              <i class="bi bi-car-front-fill text-primary pe-2 f-4"></i
              ><span class="text-center text-primary f-4 fw-bold">接駁服務</span>
            </RouterLink>
          </div>
          <div class="col-lg-4">
            <RouterLink
              to="/customtour"
              class="mb-2 mb-lg-0 d-flex align-items-center justify-content-center rounded-2 border border-primary py-3"
            >
              <i class="bi bi-file-earmark-text-fill text-primary pe-2 f-4"></i
              ><span class="text-center text-primary f-4 fw-bold">客製旅遊</span>
            </RouterLink>
          </div>
          <div class="col-lg-4">
            <RouterLink
              to="/lecture"
              class="mb-2 mb-lg-0 d-flex align-items-center justify-content-center rounded-2 border border-primary py-3"
            >
              <i class="bi bi-journal-bookmark-fill text-primary pe-2 f-4"></i
              ><span class="text-center text-primary f-4 fw-bold">旅遊講座</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="py-5 home-bottom-content">
      <div class="container py-3">
        <p class="text-center fw-bolder py-3 text-secondary fs-3">
          旅行是唯一讓我們花錢，心靈卻變得更富有的事物
        </p>
        <div class="text-center text-white px-3 px-md-5">
          <p class="fw-bolder py-3 fs-3">
            跟著 <span class="fs-2">Funnie</span> 一起去美麗的東南亞旅行，享受旅行帶給我們的美好
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Swiper from '@/components/SwiperComponent.vue'

export default {
  components: {
    Swiper
  }
}
</script>
