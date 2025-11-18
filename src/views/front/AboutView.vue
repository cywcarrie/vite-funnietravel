<template>
  <div
    class="my-5 position-relative banner container-fluid"
    style="background: linear-gradient(to right, #336b87, #90afc5)"
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
            <h3 class="fw-bolder fs-4 mb-4">品牌簡介</h3>
            <p class="lh-lg">
              創立於 2025
              年，是東南亞旅行專家，專注於新加坡、馬來西亞、泰國與峇里島等熱門目的地，為客戶量身打造專屬的旅遊行程。無論是浪漫雙人行、親子同樂或好友出遊，我們都致力於為客戶提供最專業、最優質、最安全且最貼心的專屬旅遊體驗。
            </p>
            <p class="lh-lg">
              每一個旅遊行程，皆由我們的專業團隊精心規劃並嚴格篩選，旨在為每一位客戶打造安全、愉悅且難忘的旅遊體驗，讓您盡情享受旅行的美好與感動。
            </p>
            <p class="lh-lg">
              <strong class="text-primary"
                >Funnie Travel
                用心守護每一個時刻，持續優化旅遊體驗、嚴謹把關服務品質、提供客戶最優質體驗，讓每一趟旅行，都是最美好的回憶。</strong
              >
            </p>
          </div>
          <div class="mb-5">
            <h3 class="fw-bolder fs-4 mb-4">全球服務據點</h3>
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
