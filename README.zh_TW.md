# Funnie Travel - 旅遊電商網站

## 專案說明 - 其他版本語言 : [English](README_en.md)

### Demo Website : [Link](https://cywcarrie.github.io/vite-funnietravel/#/)

模擬旅遊電商網站，包含購物車、我的最愛、商品列表與常見問題等頁面。使用者可以將商品加入購物車或我的最愛、新增或移除商品、套用優惠劵和送出訂單，並且可以瀏覽個別商品的詳細資訊。若使用者身份為管理員，可以進入後臺管理系統管理訂單，以及新增、編輯或刪除商品與優惠劵。

## 使用技術

- 使用 Vue.js 框架搭配 Vite 和 Pinia 建立專案
- 引入 Vue Router 和 Vue Axios 等套件，以實現路由管理和 API 請求功能
- 配置 ESLint 符合 Standard 規範，確保程式碼品質
- 透過 Pinia 進行狀態管理，負責跨元件的數據操作與共享
- 使用 Bootstrap 5 和 SCSS 打造響應式界面，提升使用者體驗

## 網站功能

- 前台
   - 首頁
   - 關於我們
   - 商品列表：商品分類、商品依價格排序、分頁功能
   - 商品詳情
   - 我的最愛 : 新增商品至我的最愛，也可以從我的最愛頁面移出商品
   - 常見問題
   - 購物車：新增或刪除商品、套用優惠劵
   - 結帳：建立及送出訂單
- 後台 (管理者)
   - 商品管理：切換上、下架商品，新增、修改、刪除商品及上傳商品圖片
   - 訂單管理：查看客戶訂單，也可以刪除已查看訂單
   - 優惠券管理：新增、修改、刪除優惠劵

## 安裝套件

```sh
npm install
```

### 運行專案

```sh
npm run dev
```

### 打包專案

```sh
npm run build
```

### 部署專案

```sh
npm run deploy
```

## 專案套件

- vue - ^3.4.29
- vite - ^5.3.1
- pinia - v2.1.7
- vue-router - ^4.3.3
- axios - ^1.7.7
- vue-axios - ^3.5.2
- vue-loading-overlay - v6.0
- aos - ^2.3.4
- sweetalert2 - ^11.14.2
- swiper - ^11.1.14
- vee-validate - 4.13.2
- vue3-marquee - ^4.2.2
- bootstrap - ^5.3.3
- bootstrap-icons - ^1.11.3

## 使用版本

- Node.js - v18.16.1
- npm - v9.5.1
