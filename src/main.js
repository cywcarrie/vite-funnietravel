import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { all } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import App from './App.vue'
import router from './router'
import { currency, date } from '@/methods/filters'

const app = createApp(App)
app.config.globalProperties.$filters = {
  date,
  currency
}

Object.keys(all).forEach((rule) => {
  defineRule(rule, all[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
// 設定預設語系
setLocale('zh_TW')

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component('LoadingVue', Loading)
app.component('FormVue', Form)
app.component('FieldVue', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
