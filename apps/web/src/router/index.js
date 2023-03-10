import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/404Page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dorms',
      name: 'dorms-listing',
      // component: () => import('../views/DormListing.vue'),
    },
    {
      path: '/dorms/new',
      name: 'dorm-create',
      component: () => import('../views/DormForm.vue'),
      meta: {
        requireDormOwnerRole: true,
      },
    },
    {
      path: '/dorms/:dormID(\\d+)',
      name: 'dorm-details',
      component: () => import('../views/DormDetails.vue'),
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      // component: () => import('../views/AboutPage.vue'),
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
      component: () => import('../views/Profile.vue'),
      meta: {
        requireAuth: true,
      },
      props: {
        me: true,
      },
    },
    {
      path: '/users/:userID',
      name: 'user-details',
      props: true,
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestPage.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFound,
    },
  ],
})

export default router
