import { createRouter, createWebHashHistory } from 'vue-router'
import FrontLayoutView from '@/views/FrontLayout.vue'

const routes = [
  {
    path: '/',
    name: 'FrontLayout',
    component: FrontLayoutView,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/front/HomeView.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/front/AboutView.vue')
      },
      {
        path: 'login',
        component: () => import('@/views/front/LoginView.vue')
      },
      {
        name: 'products',
        path: 'products/:category',
        component: () => import('@/views/front/UserProducts.vue')
      },
      {
        name: 'product',
        path: 'product/:productId',
        component: () => import('@/views/front/UserProduct.vue')
      },
      {
        path: 'cart',
        component: () => import('@/views/front/UserCart.vue')
      },
      {
        path: 'checkout',
        component: () => import('@/views/front/UserCheckOut.vue')
      },
      {
        path: 'checkorder/:orderId',
        component: () => import('@/views/front/UserCheckOrder.vue')
      },
      {
        path: 'favorite',
        component: () => import('@/views/front/UserFavoriteView.vue')
      },
      {
        path: 'faqs',
        component: () => import('@/views/front/FAQsView.vue')
      },
      {
        path: 'searchorder',
        component: () => import('@/views/front/SearchOrder.vue')
      },
      {
        path: 'transfer',
        component: () => import('@/views/front/UserTransfer.vue')
      },
      {
        path: 'customtour',
        component: () => import('@/views/front/UserCustomTour.vue')
      },
      {
        path: 'lecture',
        component: () => import('@/views/front/UserLecture.vue')
      },
      {
        path: 'contact',
        component: () => import('@/views/front/ContactView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('@/views/back/DashBoardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('@/views/back/ProductsView.vue')
      },
      {
        path: 'orders',
        component: () => import('@/views/back/OrdersView.vue')
      },
      {
        path: 'coupons',
        component: () => import('@/views/back/CouponsView.vue')
      }
    ]
  },
  {
    path: '/not-found',
    name: 'notFound',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
