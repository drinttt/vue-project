import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/subject',
      name: 'subject',
      component: () => import('../views/subjectView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/tetsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginView.vue')
    },
    
  ]
})

export default router
