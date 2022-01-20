import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/product',
    name: 'product',
   
    component: () => import('../views/product.vue')
  },
  {
    path: '/suport',
    name: 'suport',

    component: () => import('../views/suport.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
