import Dashboard from '@/views/dashboard/DashboardView.vue'

export const routes = [
  { path: '/', redirect: '/Dashboard' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: '/Dashboard',
        name:'Dashboard',
        component: Dashboard,
      },
      {
        path: '/VerifyShahkar',
        name:'VerifyShahkar',
        component: () => import('@/views/verify/VerifyShahkar.vue'),
      },
      {
        path: '/VerifyCart',
        name:'VerifyCart',
        component: () => import('@/views/verify/VerifyCart.vue'),
      },
      {
        path: '/VerifyCredit',
        name:'VerifyCredit',
        component: () => import('@/views/verify/VerifyCredit.vue'),
      },
      {
        path: '/VerifyPerson',
        name:'VerifyPerson',
        component: () => import('@/views/verify/VerifyPerson.vue'),
      },
      {
        path: '/VerifyPostcode',
        name:'VerifyPostcode',
        component: () => import('@/views/verify/VerifyPostcode.vue'),
      }
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
    ],
  },
]
