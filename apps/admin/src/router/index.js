import { createRouter, createWebHistory } from 'vue-router'
import TheWelcome from '../components/TheWelcome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheWelcome,
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UserListView.vue')
    },
    {
      path: '/users/:id',
      name: 'user',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/dorms',
      name: 'dorms',
      component: () => import('../views/DormListView.vue')
    },
    {
      path: '/dorms/:id',
      name: 'dorm',
      component: () => import('../views/DormView.vue')
    },
  ],
})

export default router
