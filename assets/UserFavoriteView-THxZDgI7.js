import{_ as x,m,h as f,i as v,c as r,d as a,a as t,f as w,w as u,F as b,l as $,r as g,o as n,b as i,k as C,t as l,p as d}from"./index-BnbIaM3M.js";import{f as y}from"./favoriteStore-Dm6Y5m0A.js";import{V as L}from"./VueLoading-Dz9SeSZ1.js";const V={components:{VueLoading:L},data(){return{status:{loadingItem:""}}},methods:{...m(f,["addCart"]),...m(y,["getProducts","getFavorite","removeFavorite"]),getProduct(o){this.$router.push(`/product/${o}`)}},computed:{...v(y,["isLoading","products","favoriteProduct","favoriteData"]),...v(f,["cart"])},created(){this.getProducts()}},N={class:"mb-5"},P={class:"container"},F={"aria-label":"breadcrumb",class:"mt-3 mb-md-4 d-flex justify-content-start"},D={class:"breadcrumb"},I={class:"breadcrumb-item"},S={class:"row mt-4 mb-5 bg-light rounded-2 py-3"},T={class:"col table-responsive mt-4 mb-4"},j={class:"table align-middle text-center table-light table-borderless"},B={class:"text-center"},R={class:"favorite-table"},U=["onClick"],q={class:"text-nowrap"},z={key:0,class:"h5 text-black-50"},A={key:1,class:"h6 text-black-50"},E={key:2,class:"h5 text-black"},M={class:"text-nowrap text-end ps-4 ps-lg-0"},G=["disabled","onClick"],H={key:0,class:"spinner-border text-primary spinner-border-sm",role:"status"},J=["disabled","onClick"],K={class:"text-end mt-4 mb-5"},O={key:1,class:"py-5 mb-5"},Q={class:"text-center pt-4"};function W(o,s,X,Y,h,_){const k=g("VueLoading"),c=g("RouterLink");return n(),r(b,null,[a(k,{active:o.isLoading},null,8,["active"]),s[13]||(s[13]=t("div",{class:"d-flex justify-content-center align-items-center my-5 position-relative banner banner1 container-fluid"},[t("h2",{class:"position-absolute text-center text-white fw-bolder banner-title"},"我的最愛")],-1)),t("section",N,[t("div",P,[t("a",{href:"#",title:"回上一頁",class:"text-secondary fw-bold",onClick:s[0]||(s[0]=w(e=>o.$router.go(-1),["prevent"]))},s[1]||(s[1]=[t("i",{class:"bi bi-arrow-left-square-fill fs-2"},null,-1)])),t("nav",F,[t("ol",D,[t("li",I,[a(c,{to:"/",class:"text-dark hover-nav fw-bold"},{default:u(()=>s[2]||(s[2]=[i("首頁")])),_:1})]),s[3]||(s[3]=t("li",{class:"breadcrumb-item active","aria-current":"page"},"我的最愛",-1))])]),o.favoriteProduct.length!==0?(n(),r(b,{key:0},[s[10]||(s[10]=t("div",{class:"d-flex justify-content-center mt-5"},[t("h2",{class:"fw-bold"},"我的最愛清單")],-1)),t("div",S,[t("div",T,[t("table",j,[s[8]||(s[8]=t("thead",{class:"table-secondary"},[t("tr",null,[t("th"),t("th",{class:"text-nowrap"},"行程名稱"),t("th",{class:"text-nowrap"},"價格"),t("th"),t("th",{class:"text-end"})])],-1)),t("tbody",B,[(n(!0),r(b,null,$(o.favoriteProduct,e=>(n(),r("tr",{class:"table-nowrap",key:e.id},[t("td",R,[t("div",{class:"m-auto rounded-2 favorite-table-img",style:C({backgroundImage:`url(${e.imageUrl})`})},null,4)]),t("td",{class:"text-nowrap fw-bold text-primary cursor-pointer hover-nav",onClick:p=>_.getProduct(e.id)},l(e.title),9,U),t("td",q,[e.price?d("",!0):(n(),r("div",z," NTD "+l(o.$filters.currency(e.origin_price)),1)),e.price?(n(),r("del",A,"NTD "+l(o.$filters.currency(e.origin_price)),1)):d("",!0),e.price?(n(),r("div",E," NTD "+l(o.$filters.currency(e.price)),1)):d("",!0)]),t("td",M,[t("button",{type:"button",class:"btn btn-outline-primary px-4",disabled:this.status.loadingItem===e.id,onClick:p=>o.addCart(e.id)},[this.status.loadingItem===e.id?(n(),r("div",H,s[4]||(s[4]=[t("span",{class:"visually-hidden"},"Loading...",-1)]))):d("",!0),s[5]||(s[5]=t("i",{class:"bi bi-cart-fill"},null,-1)),s[6]||(s[6]=i(" 加入購物車 "))],8,G)]),t("td",null,[t("button",{type:"button",class:"btn btn-outline-danger btn-sm",disabled:h.status.loadingItem===e.id,onClick:p=>o.removeFavorite(e)},s[7]||(s[7]=[t("i",{class:"bi bi-x-lg"},null,-1)]),8,J)])]))),128))])])])]),t("div",K,[a(c,{class:"btn btn-primary ms-auto text-end hover-btn",to:"/cart"},{default:u(()=>s[9]||(s[9]=[i("前往購物車"),t("i",{class:"bi bi-cart-fill ps-1"},null,-1)])),_:1})])],64)):(n(),r("div",O,[t("div",Q,[s[12]||(s[12]=t("h2",{class:"fw-bold mb-5"},"您尚未有行程加入我的最愛",-1)),a(c,{class:"btn btn-primary btn-lg fw-bold",to:"/products/全部"},{default:u(()=>s[11]||(s[11]=[i("馬上開始瀏覽行程吧 !")])),_:1})])]))])])],64)}const et=x(V,[["render",W]]);export{et as default};
