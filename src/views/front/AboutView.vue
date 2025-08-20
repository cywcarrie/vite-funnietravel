<template>
  <div
    class="d-flex justify-content-center align-items-center my-5 position-relative banner banner1 container-fluid"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title">關於我們</h2>
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
        <div class="col-md-6">
          <div class="mb-5">
            <h3 class="fw-bolder fs-4">品牌簡介</h3>
            <p class="lh-lg">
              <span class="fw-bold text-primary">Funnie Travel </span>
              創立於 2024
              年，是東南亞自由行專家，專注於新加坡、馬來西亞、泰國與峇里島等地區自由行旅遊，
              一直致力於為客戶提供最專業、最優質、最安全與最貼心的旅遊體驗行程。
              <br />每一個自由行旅遊行程皆是經過我們專業團隊精心規劃與嚴格篩選而安排的旅遊行程，為的是希望每一位客戶能夠擁有美好與安全的旅遊體驗並且享受自由行帶來的美好。
              <br />Funnie Travel
              用心守護每一個時刻，持續優化旅遊體驗、嚴謹把關服務品質、提供客戶最優質體驗，讓每一趟旅行，都是最美好的回憶。
            </p>
          </div>
          <div class="mb-md-5 mb-3">
            <h3 class="fw-bolder fs-4">全球服務據點</h3>
            <p class="lh-lg">
              <span class="fw-bold text-primary">Funnie Travel </span>在亞洲地區共有 6
              個服務據點，分別位於台灣、新加坡、馬來西亞、日本、泰國與印尼，並且結合 Funnie Travel
              官方旅遊網站，為全球旅人提供最專業與最貼心的在地服務。
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
