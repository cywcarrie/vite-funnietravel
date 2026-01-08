<template>
  <div class="row justify-content-center">
    <div
      class="col-12 col-lg-4 d-flex justify-content-center mb-3 mb-lg-0"
      v-for="comment in comments"
      :key="comment.author"
    >
      <div class="card">
        <div class="card-body">
          <div class="stars mb-3 fs-6">
            <i class="bi bi-star-fill pe-1"></i>
            <i class="bi bi-star-fill pe-1"></i>
            <i class="bi bi-star-fill pe-1"></i>
            <i class="bi bi-star-fill pe-1"></i>
            <i class="bi bi-star-fill"></i>
          </div>
          <p class="card-text content-text">
            {{ comment.text }}
          </p>
          <p>— {{ comment.author }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const comments = [
      {
        text: '行程規劃得非常細心，從出發前的交通安排到每天景點的順序，都考慮得十分周到。每個行程的節奏掌握得剛剛好，不會太趕，也有充足的時間休息和拍照。導遊的解說專業且親切，讓我對當地文化和歷史有更多了解。整體體驗超出預期，每一天都充滿驚喜與愉快的回憶，真的讓人覺得物超所值。',
        author: 'Eric'
      },
      {
        text: '第一次自己規劃海外旅遊，一開始有些緊張，怕會手忙腳亂，但整個行程安排非常清楚，每個景點和交通時間都考慮周到。客服回覆迅速，對我的各種疑問都耐心解答。在旅程中，節奏掌握得很好，既不會太趕，也能充分享受每個景點的氛圍。整趟旅程讓我感受到旅行的愉快與放鬆。',
        author: 'Claire'
      },
      {
        text: '景點安排非常有深度，不是走馬看花的行程，每個地方都有充分的時間去探索與體驗。導遊提供的資訊詳細而生動，讓我更深入了解當地的文化與歷史。整個行程節奏舒適，不會感覺疲憊，旅途中還有一些意外的驚喜小插曲，增添不少樂趣。整體體驗非常滿意，回家後仍然常回想旅程中的美好瞬間。',
        author: 'William'
      }
    ]
    return {
      comments
    }
  }
}
</script>
