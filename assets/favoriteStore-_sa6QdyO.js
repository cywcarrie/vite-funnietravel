import{G as a,H as s,S as i}from"./index-CbXMxIw_.js";const o={BASE_URL:"/vite-funnietravel/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_APP_API:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"funnietravel-api"},{VITE_APP_API:r,VITE_APP_PATH:f}=o,v=a("favoriteStore",{state:()=>({isLoading:!1,products:[],favoriteProduct:[],favoriteData:JSON.parse(localStorage.getItem("favorite"))||[]}),actions:{getProducts(){const t=`${r}api/${f}/products/all`;this.isLoading=!0,s.get(t).then(e=>{this.products=e.data.products,this.getFavorite(),this.isLoading=!1}).catch(e=>{i("error",`${e.response.data.message}`)})},getFavorite(){this.favoriteProduct=this.products.filter(t=>this.favoriteData.indexOf(t.id)!==-1)},addFavorite(t){this.isLoading=!0;const e=this.favoriteData.indexOf(t);e===-1?(this.favoriteData.push(t),i("success","已加入我的最愛")):(this.favoriteData.splice(e,1),i("success","已從我的最愛移除")),setTimeout(()=>{this.isLoading=!1},300),this.setStorage()},setStorage(){localStorage.setItem("favorite",JSON.stringify(this.favoriteData))},removeFavorite(t){this.isLoading=!0,this.favoriteData.splice(this.favoriteData.indexOf(t.id),1),localStorage.setItem("favorite",JSON.stringify(this.favoriteData)),this.getFavorite(),this.isLoading=!1,i("success","已從我的最愛移除")}}});export{v as f};