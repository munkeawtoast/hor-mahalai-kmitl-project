import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/404Page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
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
      path: '/auth',
      meta: {
        hideNavBar: true,
      },
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/LoginPage.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/RegisterPage.vue'),
        },
      ],
    },
    {
      path: '/users/me',
      name: 'user-self',
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
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: () => import('../views/TestPage.vue'),
    // },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: NotFound,
    },
  ],
})

export default router
