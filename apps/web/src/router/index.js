import { useUserStore } from '../stores'
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
      component: () => import('../views/DormCreateForm.vue'),
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
        noLogin: true,
      },
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/LoginPage.vue'),
        },
        {
          path: '/register',
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
    {
      path: '/testtt',
      name: 'testtt',
      component: () => import('../views/TestttPage.vue'),
    },
    {
      path: '/issues',
      meta: {
        hideIssues: true,
      },
      name: 'issues',
      component: () => import('../views/IssuePage.vue'),
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

router.beforeEach((from, to, next) => {
  if (from.meta.noLogin) {
    const userStore = useUserStore()
    if (userStore.token && userStore.badToken === false) {
      next({ name: 'home' })
    }
  }
  next()
})

export default router
