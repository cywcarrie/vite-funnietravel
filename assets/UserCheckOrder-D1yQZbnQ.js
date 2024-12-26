import{_ as y,S as c,c as o,d as p,a as t,n as u,p as a,g,F as b,l as v,t as r,b as _,w as k,r as f,o as n}from"./index-CpReYUhu.js";import{V as L}from"./VueLoading-Dopm0IWy.js";const P={BASE_URL:"/vite-funnietravel/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_APP_API:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"funnietravel-api"},{VITE_APP_API:m,VITE_APP_PATH:h}=P,V={components:{VueLoading:L},data(){return{order:{user:{}},orderId:"",isLoading:!1}},methods:{getOrder(){const l=`${m}api/${h}/order/${this.orderId}`;this.isLoading=!0,this.$http.get(l).then(s=>{this.isLoading=!1,s.data.success&&(this.order=s.data.order)}).catch(s=>{c("error",`${s.response.data.message}`)})},payOrder(){const l=`${m}api/${h}/pay/${this.orderId}`;this.isLoading=!0,this.$http.post(l).then(s=>{this.isLoading=!1,s.data.success&&this.getOrder()}).catch(s=>{c("error",`${s.response.data.message}`)})}},created(){this.orderId=this.$route.params.orderId,this.getOrder()}},I={class:"mb-5"},A={class:"container"},E={class:"d-flex justify-content-center align-items-center mb-5"},O={class:"row justify-content-center align-items-center"},S={class:"col-md-10"},T={key:0,class:"d-flex justify-content-center align-items-center mt-5"},j={key:1,class:"fs-5 fw-bold mt-4 mb-5 text-center"},C={class:"my-5 row justify-content-center"},N={class:"table align-middle table-light table-borderless mb-4"},R={class:"text-center text-primary fw-bold"},B={class:"text-center text-nowrap"},D={class:"text-center text-nowrap"},F={class:"fs-5 text-primary fw-bold text-nowrap"},H={class:"table table-light table-borderless mb-4"},M={class:"table-nowrap"},U={class:"text-nowrap"},q={class:"table-nowrap"},z={class:"text-nowrap"},G={class:"table-nowrap"},J={class:"text-nowrap"},K={class:"table-nowrap"},Q={class:"text-nowrap"},W={class:"table-nowrap"},X={class:"text-nowrap"},Y={class:"table-nowrap"},Z={key:0,class:"text-nowrap fw-bold text-danger"},$={key:1,class:"text-success fw-bold text-nowrap"},tt={key:0,class:"text-end"},st={key:1,class:"text-end"};function et(l,s,rt,ot,e,d){const x=f("VueLoading"),w=f("RouterLink");return n(),o(b,null,[p(x,{active:e.isLoading},null,8,["active"]),s[17]||(s[17]=t("div",{class:"d-flex justify-content-center align-items-center my-5 position-relative banner banner2 container-fluid"},[t("h2",{class:"position-absolute text-center text-white fw-bolder banner-title"},"結帳流程")],-1)),t("section",I,[t("div",A,[t("div",E,[s[1]||(s[1]=t("h5",{class:"fw-bold mb-0 text-secondary pay-header"},"填寫資料",-1)),s[2]||(s[2]=t("i",{class:"bi bi-caret-right-fill fs-5 mx-2 text-secondary"},null,-1)),t("h5",{class:u(["fw-bold mb-0 text-secondary pay-header",{active:e.order.is_paid===!1}])}," 確認付款 ",2),s[3]||(s[3]=t("i",{class:"bi bi-caret-right-fill fs-5 mx-2 text-secondary"},null,-1)),t("h5",{class:u(["fw-bold mb-0 text-secondary pay-header",{active:e.order.is_paid===!0}])}," 訂單完成 ",2)]),t("div",O,[t("div",S,[e.order.is_paid===!0?(n(),o("div",T,s[4]||(s[4]=[t("i",{class:"bi bi-check-circle-fill fs-2 pe-2 text-success"},null,-1),t("h2",{class:"fw-bold mb-0 text-success"},"付款成功 !",-1)]))):a("",!0),e.order.is_paid===!0?(n(),o("p",j," 感謝您的訂購，訂單明細將會寄送至您的電子信箱 ! ")):a("",!0),t("div",C,[s[16]||(s[16]=t("h3",{class:"text-center fw-bold mb-4"},"訂單明細",-1)),t("form",{class:"col-lg-6",onSubmit:s[0]||(s[0]=g((...i)=>d.payOrder&&d.payOrder(...i),["prevent"]))},[t("table",N,[s[6]||(s[6]=t("thead",{class:"text-center bg-light"},[t("tr",null,[t("th",{class:"text-nowrap"},"行程名稱"),t("th",{class:"text-center text-nowrap"},"數量"),t("th",{class:"text-nowrap"},"價格")])],-1)),t("tbody",null,[(n(!0),o(b,null,v(e.order.products,i=>(n(),o("tr",{key:i.id},[t("td",R,r(i.product.title),1),t("td",B,r(i.qty)+"/"+r(i.product.unit),1),t("td",D,r(l.$filters.currency(i.final_total)),1)]))),128))]),t("tfoot",null,[t("tr",null,[s[5]||(s[5]=t("td",{colspan:"2",class:"text-end text-nowrap"},"總計",-1)),t("td",F,r(l.$filters.currency(e.order.total)),1)])])]),s[15]||(s[15]=t("h3",{class:"text-center fw-bold mb-4"},"訂購人資訊",-1)),t("table",H,[t("tbody",null,[t("tr",M,[s[7]||(s[7]=t("th",{class:"text-nowrap"},"姓名",-1)),t("td",U,r(e.order.user.name),1)]),t("tr",q,[s[8]||(s[8]=t("th",{width:"100",class:"text-nowrap"},"Email",-1)),t("td",z,r(e.order.user.email),1)]),t("tr",G,[s[9]||(s[9]=t("th",{class:"text-nowrap"},"電話",-1)),t("td",J,r(e.order.user.tel),1)]),t("tr",K,[s[10]||(s[10]=t("th",null,"地址",-1)),t("td",Q,r(e.order.user.address),1)]),t("tr",W,[s[11]||(s[11]=t("th",null,"付款方式",-1)),t("td",X,r(e.order.user.pay),1)]),t("tr",Y,[s[12]||(s[12]=t("th",null,"付款狀態",-1)),t("td",null,[e.order.is_paid?(n(),o("span",$,"付款完成")):(n(),o("span",Z,"尚未付款"))])])])]),e.order.is_paid===!1?(n(),o("div",tt,s[13]||(s[13]=[t("button",{class:"btn btn-primary ms-auto",type:"submit"},[_(" 確認付款"),t("i",{class:"bi bi-caret-right-fill"})],-1)]))):a("",!0),e.order.is_paid===!0?(n(),o("div",st,[p(w,{to:"/products/全部",class:"btn btn-primary ms-auto"},{default:k(()=>s[14]||(s[14]=[t("i",{class:"bi bi-cart pe-1"},null,-1),_("繼續選購")])),_:1})])):a("",!0)],32)])])])])])],64)}const lt=y(V,[["render",et]]);export{lt as default};
