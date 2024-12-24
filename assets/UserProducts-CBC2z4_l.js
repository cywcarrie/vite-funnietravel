import{_ as C,m as L,h,S as T,i as I,c as n,d as m,a as s,w as v,n as u,b as a,g as V,j,k as D,t as c,F as _,l as S,r as y,o as d,p as b}from"./index-BOXT5l68.js";import{P as A}from"./PaginationComponent-BW_JI4Gx.js";import{V as E}from"./VueLoading-Br70vHwY.js";const N={全部:{name:"全部",describe:"東南亞熱門旅遊的四個國家，泰國、新加坡、馬來西亞、印尼 (峇里島)。",img:"https://i.imgur.com/L80I6O1.jpg"},峇里島:{name:"峇里島",describe:"是集東南亞神話、藝術、夢幻於一身的南洋島國，也是很熱門的度假勝地。",img:"https://i.imgur.com/r7xGPuL.jpg"},泰國:{name:"泰國",describe:"擁有「東方威尼斯」美譽的曼谷與被稱為泰國黃金海岸的度假勝地 - 芭達雅。",img:"https://i.imgur.com/r7xGPuL.jpg"},新加坡:{name:"新加坡",describe:"是東南亞最美麗的花園城市，也是東南亞治安最好的國際都會城市。",img:"https://i.imgur.com/C76pr82.jpg"},馬來西亞:{name:"馬來西亞",describe:"吉隆坡是一座新舊輝映、東方色彩與西方文明有機融合的新興大都市。",img:"https://i.imgur.com/L80I6O1.jpg"}},$={BASE_URL:"/vite-funnietravel/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_APP_API:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"funnietravel-api"},{VITE_APP_API:P,VITE_APP_PATH:w}=$,H={components:{VueLoading:E,Pagination:A},data(){return{product:{},products:[],category:"",categoryIntro:N,selectPrice:"價格",pagination:{},isLoading:!1,status:{loadingItem:""}}},watch:{$route(){this.$route.name==="products"&&(this.category=this.$route.params.category,this.getProducts())}},methods:{...L(h,["addCart"]),getProducts(o=1){this.isLoading=!0;let t=`${P}api/${w}/products?page=${o}`;this.category!=="全部"&&(t=`${P}api/${w}/products/all`),this.$http.get(t).then(l=>{if(l.data.success)if(this.category!=="全部"){this.products=l.data.products.filter(p=>p.category===this.category);const g=5,i=Math.ceil(this.products.length/g),r=(o-1)*g,f=o*g;this.products=this.products.slice(r,f),this.pagination={category:null,current_page:o,has_next:o<i,has_pre:o!==1,total_pages:i}}else this.products=l.data.products,this.pagination=l.data.pagination;this.isLoading=!1}).catch(l=>{T("error",`${l.response.data.message}`)})},goToCategory(o){this.$router.push(`/products/${o}`)},getProduct(o){this.$router.push(`/product/${o}`)},sortedProducts(){let o="";this.products.sort((t,l)=>this.selectPrice==="priceLowToHigh"?o=t.price-l.price:this.selectPrice==="priceHighToLow"?o=l.price-t.price:o)}},computed:{...I(h,["isDone"]),sortPrice(){return this.sortedProducts()}},created(){this.category=this.$route.params.category,this.getProducts()}},O={class:"mb-5"},R={class:"container"},B={"aria-label":"breadcrumb",class:"mt-3 mb-md-4 d-flex justify-content-start"},U={class:"breadcrumb"},M={class:"breadcrumb-item"},z={class:"row my-5"},F={class:"col-lg-3 mb-4 mb-lg-0"},G={class:"list-group text-start"},q={class:"ms-auto mt-3"},J={class:"col-lg-9"},K={class:"row mb-3 mb-lg-4"},Q={class:"col-12"},W={class:"text-white fw-bolder fs-1 pt-4 ps-4"},X={class:"text-white fw-bolder fs-5 px-4"},Y={class:"row row-cols-1 row-cols-md-2 row-cols-xl-3"},Z={class:"card product-card w-100 h-100"},tt=["onClick"],st=["src"],et={class:"card-body p-3"},ot={class:"d-flex justify-content-start text-primary fw-bold"},it={class:"card-title fw-bolder mb-3 text-primary"},rt={class:"d-flex justify-content-between align-items-center mb-3"},lt={key:0,class:"h5 text-black-50"},at={key:1,class:"h6 text-black-50"},nt={key:2,class:"h5 text-danger fw-bold"},ct={class:"card-footer border-0 bg-transparent pt-0 pb-3"},dt=["disabled","onClick"],ut={key:0,class:"spinner-border text-primary spinner-border-sm",role:"status"};function gt(o,t,l,g,i,r){const f=y("VueLoading"),p=y("RouterLink"),x=y("Pagination");return d(),n(_,null,[m(f,{active:i.isLoading},null,8,["active"]),t[20]||(t[20]=s("div",{class:"d-flex justify-content-center align-items-center my-5 position-relative banner banner1 container-fluid"},[s("h2",{class:"position-absolute text-center text-white fw-bolder banner-title"},"行程列表")],-1)),s("section",O,[s("div",R,[s("nav",B,[s("ol",U,[s("li",M,[m(p,{to:"/",class:"text-dark hover-nav fw-bold"},{default:v(()=>t[7]||(t[7]=[a("首頁")])),_:1})]),t[8]||(t[8]=s("li",{class:"breadcrumb-item active","aria-current":"page"},"行程列表",-1))])]),s("div",z,[s("div",F,[s("div",G,[s("button",{type:"button",class:u(["list-group-item list-group-item-action fw-bold",{active:i.category==="全部"}]),"aria-current":"true",onClick:t[0]||(t[0]=e=>r.goToCategory("全部"))},t[9]||(t[9]=[s("i",{class:"bi bi-globe me-2"},null,-1),a(" 全部 ")]),2),s("button",{type:"button",class:u(["list-group-item list-group-item-action fw-bold",{active:i.category==="峇里島"}]),onClick:t[1]||(t[1]=e=>r.goToCategory("峇里島"))},t[10]||(t[10]=[s("i",{class:"bi bi-globe me-2"},null,-1),a(" 峇里島 ")]),2),s("button",{type:"button",class:u(["list-group-item list-group-item-action fw-bold",{active:i.category==="泰國"}]),onClick:t[2]||(t[2]=e=>r.goToCategory("泰國"))},t[11]||(t[11]=[s("i",{class:"bi bi-globe me-2"},null,-1),a(" 泰國 ")]),2),s("button",{type:"button",class:u(["list-group-item list-group-item-action fw-bold",{active:i.category==="新加坡"}]),onClick:t[3]||(t[3]=e=>r.goToCategory("新加坡"))},t[12]||(t[12]=[s("i",{class:"bi bi-globe me-2"},null,-1),a(" 新加坡 ")]),2),s("button",{type:"button",class:u(["list-group-item list-group-item-action fw-bold",{active:i.category==="馬來西亞"}]),onClick:t[4]||(t[4]=e=>r.goToCategory("馬來西亞"))},t[13]||(t[13]=[s("i",{class:"bi bi-globe me-2"},null,-1),a(" 馬來西亞 ")]),2)]),s("div",q,[V(s("select",{class:"form-select fw-bold text-primary","aria-label":"Default select example","onUpdate:modelValue":t[5]||(t[5]=e=>i.selectPrice=e),onChange:t[6]||(t[6]=(...e)=>r.sortPrice&&r.sortPrice(...e))},t[14]||(t[14]=[s("option",{selected:"",disabled:"",class:"fw-bold"},"價格",-1),s("option",{value:"priceLowToHigh",class:"fw-bold"},"由低至高",-1),s("option",{value:"priceHighToLow",class:"fw-bold"},"由高至低",-1)]),544),[[j,i.selectPrice]])])]),s("div",J,[s("div",K,[s("div",Q,[s("div",{class:"rounded products-all",style:D(`
              background-image: linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),
              url(${i.categoryIntro[i.category].img});`)},[s("h2",W,c(i.category),1),s("p",X,c(i.categoryIntro[i.category].describe),1)],4)])]),s("div",Y,[(d(!0),n(_,null,S(i.products,e=>(d(),n("div",{class:"col mb-4",key:e.id},[s("div",Z,[m(p,{class:"",to:`/product/${e.id}`},{default:v(()=>[s("div",{class:"product-img cursor-pointer",onClick:k=>r.getProduct(e.id)},[s("img",{src:e.imageUrl,class:"card-img-top object-fit-cover",alt:"allProuctsImages"},null,8,st),t[15]||(t[15]=s("span",{class:"seemore-text d-flex justify-content-center align-items-center text-white"},[s("i",{class:"bi bi-search pe-1"}),a(" 查看更多 ")],-1))],8,tt),s("div",et,[s("div",ot,[s("p",null,[t[16]||(t[16]=s("i",{class:"bi bi-globe me-2"},null,-1)),a(c(e.category),1)])]),s("h5",it,c(e.title),1),s("div",rt,[e.price?b("",!0):(d(),n("div",lt," NTD "+c(o.$filters.currency(e.origin_price)),1)),e.price?(d(),n("del",at,"NTD "+c(o.$filters.currency(e.origin_price)),1)):b("",!0),e.price?(d(),n("div",nt," NTD "+c(o.$filters.currency(e.price)),1)):b("",!0)])])]),_:2},1032,["to"]),s("div",ct,[s("button",{type:"button",class:"btn btn-outline-primary w-100",disabled:this.status.loadingItem===e.id,onClick:k=>o.addCart(e.id)},[this.status.loadingItem===e.id?(d(),n("div",ut,t[17]||(t[17]=[s("span",{class:"visually-hidden"},"Loading...",-1)]))):b("",!0),t[18]||(t[18]=s("i",{class:"bi bi-cart-fill"},null,-1)),t[19]||(t[19]=a(" 加入購物車 "))],8,dt)])])]))),128))]),m(x,{pages:i.pagination,onEmitPages:r.getProducts},null,8,["pages","onEmitPages"])])])])])],64)}const ft=C(H,[["render",gt]]);export{ft as default};