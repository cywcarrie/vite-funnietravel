<template>
  <div
    class="my-5 position-relative banner container-fluid"
    style="background: linear-gradient(to right, #336b87, #90afc5)"
  >
    <h2 class="position-absolute text-center text-white fw-bolder banner-title fs-2">接駁服務</h2>
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
          <li class="breadcrumb-item active" aria-current="page">接駁服務</li>
        </ol>
      </nav>
      <h2 class="text-center fw-bold text-primary my-5">交通與接駁服務</h2>
      <p class="fw-bold mt-4">
        <i class="bi bi-car-front-fill me-2"></i>
        所有接駁服務皆提供雙向接送，並可代辦高鐵票購買。如需相關協助，歡迎洽詢專員。
      </p>
      <div class="bg-light p-3 shadow-sm rounded-4 d-none d-lg-block mb-5">
        <div class="table-responsive overflow-x-hidden">
          <table class="table table-light table-hover table-borderless">
            <thead class="table-light">
              <tr>
                <th>機場 / 高鐵站</th>
                <th>交通工具</th>
                <th>起價 (單程)</th>
                <th>預約需求</th>
                <th>備註</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transfer in transfers" :key="transfer.name">
                <th scope="row">{{ transfer.name }}</th>
                <td>{{ transfer.type }}</td>
                <td class="text-nowrap text-danger fw-bold">{{ transfer.price }}</td>
                <td>{{ transfer.reserve }}</td>
                <td>{{ transfer.notes }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="d-block d-lg-none mb-5">
        <div
          class="bg-white p-3 shadow-sm rounded-4 mb-3 border border-light-subtle"
          v-for="transfer in transfers"
          :key="transfer.name"
        >
          <div class="fw-bold mb-2">
            {{ transfer.name }}
          </div>
          <div class="d-flex justify-content-start flex-wrap">
            <small>{{ transfer.type }}</small>
          </div>
          <div class="d-flex justify-content-start flex-wrap">
            <small>{{ transfer.reserve }}</small>
          </div>
          <div class="d-flex justify-content-start flex-wrap">
            <small>{{ transfer.notes }}</small>
          </div>
          <div class="d-flex justify-content-end text-nowrap mt-2">
            <small class="text-body-secondary"
              >起價 (單程) <span class="ps-1 text-danger fw-bold">{{ transfer.price }}</span></small
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  setup() {
    const transfers = [
      {
        name: '桃園國際機場 (TPE)',
        type: '轎車 / 休旅車 / 商務車',
        price: 'TWD 800 – TWD 1,500',
        reserve: '需提前 24 小時預約',
        notes: '夜間加價 TWD 300；免費等候 60 分鐘'
      },
      {
        name: '高雄國際機場 (KHH)',
        type: '轎車 / 休旅車 / 商務車',
        price: 'TWD 700 – TWD 1,400',
        reserve: '需提前 12 小時預約',
        notes: '等候超過 30 分鐘收費；可選中文司機'
      },
      {
        name: '台灣高鐵 (台北站)',
        type: '轎車 / 休旅車 / 箱型車',
        price: 'TWD 700 – TWD 1,300',
        reserve: '需提前 12 小時預約',
        notes: '可提供兒童座椅'
      },
      {
        name: '台灣高鐵 (板橋站)',
        type: '轎車 / 休旅車',
        price: 'TWD 600 – TWD 1,200',
        reserve: '需提前 6 小時預約',
        notes: '行李限 2 件；可提供兒童座椅'
      },
      {
        name: '台灣高鐵 (桃園站)',
        type: '轎車 / 休旅車',
        price: 'TWD 600 – TWD 1,200',
        reserve: '需提前 6 小時預約',
        notes: '行李限 2 件；可提供兒童座椅'
      },
      {
        name: '台灣高鐵 (台中站)',
        type: '轎車 / 休旅車 / 箱型車',
        price: 'TWD 700 – TWD 1,300',
        reserve: '需提前 12 小時預約',
        notes: '可提供兒童座椅'
      },
      {
        name: '台灣高鐵 (台南站)',
        type: '轎車 / 休旅車',
        price: 'TWD 600 – TWD 1,200',
        reserve: '需提前 6 小時預約',
        notes: '行李限 2 件；可提供兒童座椅'
      },
      {
        name: '台灣高鐵 (左營站)',
        type: '轎車 / 休旅車 / 箱型車',
        price: 'TWD 700 – TWD 1,300',
        reserve: '需提前 12 小時預約',
        notes: '可提供兒童座椅'
      }
    ]
    return {
      transfers
    }
  }
}
</script>
