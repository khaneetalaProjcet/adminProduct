import Dashboard from '@/views/dashboard/DashboardView.vue'

export const routes = [
  { path: '/', redirect: '/Dashboard' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '/Dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
      },
      {
        path: '/VerifyShahkar',
        name: 'VerifyShahkar',
        component: () => import('@/views/verify/VerifyShahkar.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/VerifyCart',
        name: 'VerifyCart',
        component: () => import('@/views/verify/VerifyCart.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/VerifyCredit',
        name: 'VerifyCredit',
        component: () => import('@/views/verify/VerifyCredit.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/VerifyPerson',
        name: 'VerifyPerson',
        component: () => import('@/views/verify/VerifyPerson.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/VerifyPostcode',
        name: 'VerifyPostcode',
        component: () => import('@/views/verify/VerifyPostcode.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/userView',
        name: 'userView',
        component: () => import('@/views/users/userView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/goldboxView',
        name: 'goldboxView',
        component: () => import('@/views/goldbox/goldboxView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/walletView',
        name: 'walletView',
        component: () => import('@/views/wallet/walletView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/managmentView',
        name: 'managmentView',
        component: () => import('@/views/managment/managmentView.vue'),
        meta: { requiresAuth: true }
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/loginView.vue'),
      },
    ],
  },
]
