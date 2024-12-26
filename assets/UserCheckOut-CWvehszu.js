import{_ as w,m as P,h,S as q,i as A,c,d as t,a as l,e as U,F as g,l as L,t as f,p as v,w as y,r as b,o as u,b as n,n as m,f as N,v as T}from"./index-CpReYUhu.js";import{V as S}from"./VueLoading-Dopm0IWy.js";const M={BASE_URL:"/vite-funnietravel/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_APP_API:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"funnietravel-api"},{VITE_APP_API:I,VITE_APP_PATH:C}=M,F={components:{VueLoading:S},data(){return{isLoading:!1,total:0,final_total:0,form:{user:{name:"",email:"",tel:"",address:"",pay:"",bill:"",billNum:""},message:""},coupon_code:"",expiryDate:"",cardNumber:""}},watch:{cardNumber(a,e){a.length<e.length&&a.charAt(a.length-1)===" "&&(this.cardNumber=e.slice(0,-2)),a.length>e.length&&(a.length+1)%5===0&&this.cardNumber.length!==0&&this.cardNumber.length<19&&(this.cardNumber=a+" ")},expiryDate(a,e){a.length===2&&a.length>e.length?this.expiryDate+="/":a.length<e.length&&e.charAt(2)==="/"&&e.length===3&&(this.expiryDate=e.slice(0,1))}},methods:{...P(h,["getCart"]),createOrder(){const a=`${I}api/${C}/order`,e=this.form;this.isLoading=!0,this.$http.post(a,{data:e}).then(p=>{this.isLoading=!1,this.$router.push(`/checkorder/${p.data.orderId}`),this.getCart()}).catch(p=>{q("error",`${p.response.data.message}`)})}},computed:{...A(h,["cart"])},created(){this.getCart()}},j={class:"mb-5"},D={class:"container"},E={class:"row my-5 py-5 justify-content-center"},O={class:"col-12 col-md-8"},R={class:"col-12"},B={class:"table-responsive-md mb-5 mb-lg-0"},H={class:"table align-middle table-borderless"},Y={class:"text-center"},z={class:"table-nowrap fw-bold text-primary"},G={class:"text-nowrap"},J={class:"text-end text-nowrap"},K={key:0,class:"text-success text-end"},Q={class:"text-end fs-5 text-primary fw-bold"},W={key:0},X={class:"text-end text-success fs-5 fw-bold"},Z={class:"col-12"},$={class:"row d-flex justify-content-center mt-5"},ee={class:"mb-3"},le={class:"mb-3"},se={class:"mb-3"},te={class:"mb-3"},oe={class:"mb-3"},ae={class:"col-12 d-flex flex-md-row flex-column align-md-items-center"},re={class:"d-flex"},ie={class:"form-check form-radio me-3"},ne={class:"form-check form-radio me-3"},de={class:"form-check form-radio"},me={class:"mb-2 mb-md-0"},ce={key:0,class:"mb-3"},ue={class:"row"},fe={class:"col-12"},be={class:"my-3 col-12 col-md-6"},pe={class:"mb-3 col-12 col-md-6"},ve={class:"mb-3"},he={class:"col-12 d-flex align-items-center"},ge={class:"d-flex"},ye={class:"form-check form-radio me-3"},Ve={class:"form-check form-radio"},xe={key:1,class:"mb-3"},_e={class:"mb-3"},ke={class:"d-flex justify-content-between"};function we(a,e,p,Pe,s,V){const x=b("VueLoading"),i=b("FieldVue"),d=b("ErrorMessage"),_=b("RouterLink"),k=b("FormVue");return u(),c(g,null,[t(x,{active:s.isLoading},null,8,["active"]),e[36]||(e[36]=l("div",{class:"d-flex justify-content-center align-items-center my-5 position-relative banner banner2 container-fluid"},[l("h2",{class:"position-absolute text-center text-white fw-bolder banner-title"},"結帳流程")],-1)),l("section",j,[l("div",D,[e[35]||(e[35]=U('<div class="d-flex justify-content-center align-items-center my-5"><h5 class="fw-bold mb-0 text-secondary pay-header active">填寫資料</h5><i class="bi bi-caret-right-fill fs-5 mx-2 text-secondary"></i><h5 class="fw-bold mb-0 text-secondary pay-header">確認付款</h5><i class="bi bi-caret-right-fill fs-5 mx-2 text-secondary"></i><h5 class="fw-bold mb-0 text-secondary pay-header">訂單完成</h5></div>',1)),l("div",E,[l("div",O,[l("div",R,[e[16]||(e[16]=l("h3",{class:"text-center fw-bold mb-4"},"行程明細",-1)),l("div",B,[l("table",H,[e[15]||(e[15]=l("thead",{class:"text-center table-secondary"},[l("tr",{class:"table-nowrap"},[l("th",null,"行程名稱"),l("th",{class:"text-nowrap"},"數量"),l("th",{class:"text-end"},"價格")])],-1)),l("tbody",Y,[(u(!0),c(g,null,L(a.cart.carts,r=>(u(),c("tr",{class:"table-nowrap",key:r.id},[l("td",z,f(r.product.title),1),l("td",G,f(r.qty)+"/"+f(r.product.unit),1),l("td",J,[a.cart.final_total!==a.cart.total?(u(),c("small",K,"優惠價：")):v("",!0),n(" "+f(a.$filters.currency(r.final_total)),1)])]))),128))]),l("tfoot",null,[l("tr",null,[e[13]||(e[13]=l("td",{colspan:"2",class:"text-end fs-5"},"總計",-1)),l("td",Q,f(a.$filters.currency(a.cart.total)),1)]),a.cart.final_total!==a.cart.total?(u(),c("tr",W,[e[14]||(e[14]=l("td",{colspan:"2",class:"text-end text-success fs-5"},"優惠價",-1)),l("td",X,f(a.$filters.currency(a.cart.final_total)),1)])):v("",!0)])])])]),l("div",Z,[l("div",$,[e[34]||(e[34]=l("h3",{class:"text-center fw-bold mb-4"},"訂購人資訊",-1)),t(k,{onSubmit:V.createOrder,class:"col-12"},{default:y(({errors:r})=>[l("div",ee,[e[17]||(e[17]=l("label",{for:"name",class:"form-label"},[n("訂購人姓名"),l("small",{class:"ps-1 text-danger fw-bold"},"*")],-1)),t(i,{id:"name",name:"姓名",type:"text",class:m(["form-control",{"is-invalid":r.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:s.form.user.name,"onUpdate:modelValue":e[0]||(e[0]=o=>s.form.user.name=o)},null,8,["class","modelValue"]),t(d,{name:"姓名",class:"invalid-feedback"})]),l("div",le,[e[18]||(e[18]=l("label",{for:"email",class:"form-label"},[n("訂購人電子信箱"),l("small",{class:"ps-1 text-danger fw-bold"},"*")],-1)),t(i,{id:"email",name:"email",type:"email",class:m(["form-control",{"is-invalid":r.email}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:s.form.user.email,"onUpdate:modelValue":e[1]||(e[1]=o=>s.form.user.email=o)},null,8,["class","modelValue"]),t(d,{name:"email",class:"invalid-feedback"})]),l("div",se,[e[19]||(e[19]=l("label",{for:"tel",class:"form-label"},[n("訂購人電話"),l("small",{class:"ps-1 text-danger fw-bold"},"*")],-1)),t(i,{id:"tel",name:"電話",type:"tel",class:m(["form-control",{"is-invalid":r.電話}]),placeholder:"不含 - 符號的手機或室話",rules:"required|numeric|min:8|max:10",modelValue:s.form.user.tel,"onUpdate:modelValue":e[2]||(e[2]=o=>s.form.user.tel=o)},null,8,["class","modelValue"]),t(d,{name:"電話",class:"invalid-feedback"})]),l("div",te,[e[20]||(e[20]=l("label",{for:"address",class:"form-label"},[n("訂購人地址"),l("small",{class:"ps-1 text-danger fw-bold"},"*")],-1)),t(i,{id:"address",name:"地址",type:"text",class:m(["form-control",{"is-invalid":r.地址}]),placeholder:"請輸入地址",rules:"required",modelValue:s.form.user.address,"onUpdate:modelValue":e[3]||(e[3]=o=>s.form.user.address=o)},null,8,["class","modelValue"]),t(d,{name:"地址",class:"invalid-feedback"})]),l("div",oe,[l("fieldset",ae,[e[24]||(e[24]=l("legend",{class:"form-label me-md-4 me-0 fs-6 fs-md-5 w-auto mb-2 mb-md-0"},[n(" 付款方式"),l("small",{class:"ps-1 text-danger fw-bold"},"*")],-1)),l("div",{class:m(["normal-input",{error:r.付款方式}])},[l("div",re,[l("div",ie,[t(i,{class:"form-check-input",type:"radio",name:"付款方式",rules:"required",id:"信用卡",value:"信用卡",modelValue:s.form.user.pay,"onUpdate:modelValue":e[4]||(e[4]=o=>s.form.user.pay=o)},null,8,["modelValue"]),e[21]||(e[21]=l("label",{class:"form-check-label",for:"信用卡"},"信用卡",-1))]),l("div",ne,[t(i,{class:"form-check-input",type:"radio",name:"付款方式",rules:"required",id:"ATM 轉帳",value:"ATM 轉帳",modelValue:s.form.user.pay,"onUpdate:modelValue":e[5]||(e[5]=o=>s.form.user.pay=o)},null,8,["modelValue"]),e[22]||(e[22]=l("label",{class:"form-check-label",for:"ATM 轉帳"},"ATM 轉帳",-1))]),l("div",de,[t(i,{class:"form-check-input",type:"radio",name:"付款方式",rules:"required",id:"linePay",value:"Line Pay",modelValue:s.form.user.pay,"onUpdate:modelValue":e[6]||(e[6]=o=>s.form.user.pay=o)},null,8,["modelValue"]),e[23]||(e[23]=l("label",{class:"form-check-label",for:"linePay"},"Line Pay",-1))])]),l("div",me,[t(d,{name:"付款方式",class:"error-text position-absolute text-danger mb-2 mb-md-0"})])],2)])]),s.form.user.pay==="信用卡"?(u(),c("div",ce,[e[27]||(e[27]=l("label",{for:"cardNum",class:"form-label"},[n("信用卡號"),l("small",{class:"ps-1 text-danger fw-bold"},"*")],-1)),l("div",ue,[l("div",fe,[t(i,{id:"cardNum",name:"卡號",type:"tel",class:m(["form-control",{"is-invalid":r.卡號}]),maxlength:"19",placeholder:"**** **** **** ****",rules:"required",modelValue:s.cardNumber,"onUpdate:modelValue":e[7]||(e[7]=o=>s.cardNumber=o)},null,8,["class","modelValue"]),t(d,{name:"卡號",class:"invalid-feedback"}),l("div",be,[e[25]||(e[25]=l("label",{for:"period",class:"form-label required"},[n("有效日期"),l("small",{class:"ps-1 text-danger fw-bold"},"*")],-1)),t(i,{id:"period",name:"有效日期",type:"tel",class:m(["form-control",{"is-invalid":r.有效日期}]),placeholder:"MM/YY",maxlength:"5",modelValue:s.expiryDate,"onUpdate:modelValue":e[8]||(e[8]=o=>s.expiryDate=o),rules:"required"},null,8,["modelValue","class"]),t(d,{name:"有效日期",class:"invalid-feedback"})]),l("div",pe,[e[26]||(e[26]=l("label",{for:"checkCode",class:"form-label required"},[n("檢查碼"),l("small",{class:"ps-1 text-danger fw-bold"},"*")],-1)),t(i,{id:"checkCode",name:"檢查碼",type:"text",class:m(["form-control",{"is-invalid":r.檢查碼}]),maxlength:"3",placeholder:"CVC/CVV",rules:"required|length:3|numeric:true"},null,8,["class"]),t(d,{name:"檢查碼",class:"invalid-feedback"})])])])])):v("",!0),l("div",ve,[l("fieldset",he,[e[30]||(e[30]=l("legend",{class:"form-label me-4 mb-0 fs-6 fs-md-5 w-auto"},[n(" 發票類型"),l("small",{class:"ps-1 text-danger fw-bold"},"*")],-1)),l("div",{class:m(["normal-input",{error:r.發票類型}])},[l("div",ge,[l("div",ye,[t(i,{class:"form-check-input",type:"radio",name:"發票類型",rules:"required",id:"紙本發票",value:"紙本發票",modelValue:s.form.user.bill,"onUpdate:modelValue":e[9]||(e[9]=o=>s.form.user.bill=o)},null,8,["modelValue"]),e[28]||(e[28]=l("label",{class:"form-check-label",for:"紙本發票"},"紙本發票",-1))]),l("div",Ve,[t(i,{class:"form-check-input",type:"radio",name:"發票類型",rules:"required",id:"電子載具",value:"電子載具",modelValue:s.form.user.bill,"onUpdate:modelValue":e[10]||(e[10]=o=>s.form.user.bill=o)},null,8,["modelValue"]),e[29]||(e[29]=l("label",{class:"form-check-label",for:"電子載具"},"電子載具",-1))])]),t(d,{name:"發票類型",class:"error-text position-absolute text-danger"})],2)])]),s.form.user.bill==="電子載具"?(u(),c("div",xe,[t(i,{name:"電子載具",type:"text",class:m(["form-control",{"is-invalid":r.電子載具}]),placeholder:"請輸入  '/'  開頭的載具號碼",rules:"required",modelValue:s.form.user.billNum,"onUpdate:modelValue":e[11]||(e[11]=o=>s.form.user.billNum=o)},null,8,["class","modelValue"]),t(d,{name:"電子載具",class:"invalid-feedback"})])):v("",!0),l("div",_e,[e[31]||(e[31]=l("label",{for:"message",class:"form-label"},"留言",-1)),N(l("textarea",{name:"",id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":e[12]||(e[12]=o=>s.form.message=o)},null,512),[[T,s.form.message]])]),l("div",ke,[t(_,{class:"btn btn-outline-primary",to:"/cart"},{default:y(()=>e[32]||(e[32]=[l("i",{class:"bi bi-caret-left-fill"},null,-1),n("回上一頁")])),_:1}),e[33]||(e[33]=l("button",{type:"submit",class:"btn btn-primary"},[n(" 確認訂單"),l("i",{class:"bi bi-caret-right-fill"})],-1))])]),_:1},8,["onSubmit"])])])])])])])],64)}const Ue=w(F,[["render",we]]);export{Ue as default};
