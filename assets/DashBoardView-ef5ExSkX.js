import{_ as u,S as r,r as d,o as _,c as v,a as s,e as m,I as b,d as n,w as c,b as p,f as g,F as P}from"./index-CDcTfnKC.js";const $={BASE_URL:"/vite-funnietravel/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_APP_API:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"funnietravel-api"},{VITE_APP_API:A}=$,x={methods:{logout(){const a=`${A}logout`;this.$http.post(a,this.user).then(t=>{t.data.success?(r("success","登出成功"),this.$router.push("/login")):r("error","登出失敗")}).catch(t=>{r("error",`${t.response.data.message}`)})}}},k={class:"navbar navbar-expand-lg navbar-light bg-light shadow-sm"},V={class:"container-fluid"},w={class:"collapse navbar-collapse",id:"navbarNavAltMarkup"},E={class:"navbar-nav"};function I(a,t,e,f,h,i){const o=d("RouterLink");return _(),v("nav",k,[s("div",V,[t[4]||(t[4]=m('<a class="navbar-brand text-white fw-bold me-auto d-flex align-items-center" href="#"><img src="'+b+'" alt="funnie-logo" class="funnie-logo-img"><h1 class="logo text-primary fs-2 fw-bolder mb-0 px-2 me-5">Funnie</h1></a><button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>',2)),s("div",w,[s("div",E,[n(o,{to:"/admin/products",class:"nav-link text-primary fw-bold hover-nav"},{default:c(()=>t[1]||(t[1]=[p("產品")])),_:1}),n(o,{to:"/admin/orders",class:"nav-link text-primary fw-bold hover-nav"},{default:c(()=>t[2]||(t[2]=[p("訂單")])),_:1}),n(o,{to:"/admin/coupons",class:"nav-link text-primary fw-bold hover-nav"},{default:c(()=>t[3]||(t[3]=[p("優惠券")])),_:1}),s("a",{href:"#",onClick:t[0]||(t[0]=g((...l)=>i.logout&&i.logout(...l),["prevent"])),class:"nav-link text-primary fw-bold hover-nav"},"登出")])])])])}const T=u(x,[["render",I]]),N={BASE_URL:"/vite-funnietravel/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_APP_API:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"funnietravel-api"},{VITE_APP_API:R}=N,S={components:{Navbar:T},created(){const a=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=a;const t=`${R}api/user/check`;this.$http.post(t,this.user).then(e=>{e.data.success||this.$router.push("/login")}).catch(e=>{r("error",`${e.response.data.message}`)})}},D={class:"container-fluid mt-3 position-relative"};function y(a,t,e,f,h,i){const o=d("Navbar"),l=d("RouterView");return _(),v(P,null,[n(o),s("div",D,[n(l)])],64)}const M=u(S,[["render",y]]);export{M as default};
