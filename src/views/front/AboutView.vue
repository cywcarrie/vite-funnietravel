<template>
  <div
    class="my-5 position-relative banner container-fluid"
    style="background: linear-gradient(to right, #457b9d, #a8dadc)"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title fs-2">關於我們</h2>
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
          <li class="breadcrumb-item active" aria-current="page">關於我們</li>
        </ol>
      </nav>
      <h2 class="text-center fw-bold text-primary mt-5">
        關於 <span class="fw-bolder text-secondary"> Funnie Travel</span>
      </h2>
      <div class="row d-flex justify-content-center align-items-center mt-4 py-5">
        <div class="col-lg-6 col-md-8">
          <div class="mb-5">
            <h3 class="fw-bolder fs-4 mb-3">品牌簡介</h3>
            <p class="lh-lg">
              創立於 2025
              年，是專注於東南亞的專業旅遊品牌，深耕新加坡、馬來西亞、泰國與峇里島等熱門目的地，致力於為每一位旅客量身打造專屬的旅遊行程。無論是浪漫雙人行、親子同樂，或好友結伴出遊，我們始終以專業、安全且貼心的服務，陪伴每一段珍貴旅程。
            </p>
            <p class="lh-lg">
              每一趟旅程皆由專業團隊精心規劃與嚴格把關，從行程設計、住宿安排到在地體驗與服務流程，都經過反覆評估與實地確認，確保旅途每個細節安心無虞，讓旅客能全心投入旅行的美好與感動。
            </p>
            <p class="lh-lg">
              我們堅持不走制式化套裝行程，而是以旅客需求為出發點，依照不同旅遊目的與期待，打造專屬的理想旅程。無論是放鬆度假、文化探索，或特別紀念日的安排，我們都用心傾聽，細心實現。
            </p>
            <p class="lh-lg">
              行程規劃團隊擁有豐富的東南亞實地踩線與操作經驗，熟悉當地文化、交通與旅遊環境，並能即時應對旅途中可能出現的各種狀況，提供穩定可靠的後勤支援，讓每一趟旅程更加順暢安心。
            </p>
            <p class="lh-lg">
              我們用心守護旅途中的每一個時刻，持續優化旅遊體驗、嚴謹把關服務品質，只為帶給旅客最安心、最值得信賴的旅遊感受。期盼透過每一次真誠的服務，讓旅行不只是一次出發，而是一段值得珍藏的美好回憶。
            </p>
            <p class="lh-lg">
              <strong class="text-primary"
                >Funnie Travel 陪您安心出發，細細收藏每一趟旅程的感動。</strong
              >
            </p>
          </div>
          <div class="mb-5">
            <h3 class="fw-bolder fs-4 mb-3">全球服務據點</h3>
            <p class="lh-lg">
              在亞洲地區共有 6
              個服務據點，分別位於台灣、新加坡、馬來西亞、日本、泰國與印尼，並且結合 Funnie Travel
              官方旅遊網站，為全球旅人提供最專業與最貼心的在地服務。
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
