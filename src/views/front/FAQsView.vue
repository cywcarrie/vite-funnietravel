<template>
  <div
    class="my-5 position-relative banner container-fluid"
    style="background: linear-gradient(to right, #336b87, #90afc5)"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title fs-2">常見問題</h2>
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
          <li class="breadcrumb-item active" aria-current="page">常見問題</li>
        </ol>
      </nav>
      <h2 class="text-center fw-bold text-dark mt-5">常見 Q & A</h2>
      <div class="row justify-content-center mt-4 py-5">
        <div class="col-md-8 col-11">
          <div class="accordion" id="accordionExample">
            <div
              class="accordion-item mb-3 border border-3 rounded-3"
              v-for="(item, index) in faqItems"
              :key="index"
            >
              <h2 class="accordion-header rounded-3" :id="`heading${index}`">
                <button
                  class="accordion-button collapsed fs-5 fw-bold rounded-3"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#collapse${index}`"
                  aria-expanded="false"
                  :aria-controls="`collapse${index}`"
                >
                  <i class="bi bi-question-circle-fill me-2 text-primary fs-2"></i
                  >{{ item.question }}
                </button>
              </h2>
              <div
                :id="`collapse${index}`"
                class="accordion-collapse collapse"
                :aria-labelledby="`heading${index}`"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <span v-html="item.answer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const couponCode = 'funnietravel'
    const faqItems = ref([
      {
        question: '如何訂購行程 ?',
        answer: '您可以將您想要訂購的行程加入購物車，然後依照畫面上的指示操作即可完成訂購。'
      },
      {
        question: '若我自己不參加的話，可以幫親友訂購行程嗎 ?',
        answer: '可以，您可以幫親友訂購行程，而自己不同行。'
      },
      {
        question: '付款完成後，我要如何取得完整的訂單明細 ?',
        answer: '付款完成後，您的完整訂單明細將會寄送至您填寫的電子信箱。'
      },
      {
        question: '若完成訂購之後發現訂單內容有錯誤的話，該怎麼辦 ?',
        answer: '訂單一經成立，恕無法提供修改。請洽詢我們專員協助您修改或重新訂購。'
      },
      {
        question: '行程包含哪些費用 ?',
        answer:
          '行程包含住宿、機票與景點門票等費用，詳情請參閱行程頁面介紹。若欲獲得更多行程相關資訊，請洽詢專員。'
      },
      {
        question: '可以更改或是取消行程嗎 ?',
        answer:
          '更改與取消行程的相關規定請參閱行程頁面介紹。若欲瞭解更多更改或取消行程的相關資訊，請洽詢專員。'
      },
      {
        question: '什麼是優惠碼 ?',
        answer: `優惠碼是 Funnie Travel 提供的優惠方式。優惠期間內，在我們的網站上訂購行程結帳時輸入優惠碼 &#12300;<strong class="text-primary">${couponCode}</strong>&#12301;，即可享有<strong> 85 </strong>折限時優惠。`
      },
      {
        question: '優惠碼使用說明 ?',
        answer: `請於購物車頁面的「優惠碼」欄位輸入優惠碼 &#12300;<strong class="text-primary">${couponCode}</strong>&#12301;，並點選&#12300;套用&#12301;按鈕。若優惠碼輸入正確，系統將套用折扣並於畫面顯示折抵金額。`
      }
    ])

    return {
      faqItems,
      couponCode
    }
  }
}
</script>
