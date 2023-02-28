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
        title: 'หน้าหลัก',
      },
    },
    {
      path: '/dorms',
      name: 'dorms-listing',
      // component: () => import('../views/DormListing.vue'),
      meta: {
        title: 'รายการหอ',
      },
    },
    {
      path: '/dorms/new',
      name: 'dorm-create',
      // component: () => import('../views/DormForm.vue')
      meta: {
        requireDormOwnerRole: true,
        title: 'เพิ่มหอของคุณ',
      },
    },
    {
      path: '/dorms/:id',
      name: 'dorm-details',
      // component: () => import('../views/DormDetails.vue'),
      meta: {
        title: () => {},
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue'),
      meta: {
        hideNavBar: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterPage.vue'),
      meta: {
        hideNavBar: true,
      },
    },
    {
      path: '/users/me',
      name: 'user-details-self',
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/users/:id',
      name: 'user-details',
      meta: {
        show404: true,
      },
    },
  ],
})

router.beforeEach((to, from) => {
  if (to.requireDormOwnerRole) {
  }
})

export default router
