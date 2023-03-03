import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        authCheck: true,
      },
    },
    {
      path: '/dorms',
      name: 'dorms',
      component: () => import('../views/DormsView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        disableSidebar: true,
      },
    },
    {
      path: '/tickets',
      name: 'tickets',
      comopnent: () => import('../views/TicketsView.vue'),
    },
  ],
})

router.beforeEach(async (to, from) => {
  if (to.meta.authCheck) {
  }
})

export default router
