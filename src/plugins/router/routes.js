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
        path: '/goldboxTrade',
        name: 'goldboxTrade',
        component: () => import('@/views/goldbox/goldboxTradeView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/goldboxSell',
        name: 'goldboxSell',
        component: () => import('@/views/goldbox/goldboxSellView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/goldboxBuy',
        name: 'goldboxBuy',
        component: () => import('@/views/goldbox/goldboxBuyView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/walletView',
        name: 'walletView',
        component: () => import('@/views/wallet/walletView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/withdrawWallet',
        name: 'withdrawWallet',
        component: () => import('@/views/wallet/withdrawWalletView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/depositWallet',
        name: 'depositWallet',
        component: () => import('@/views/wallet/depositWalletView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/managmentView',
        name: 'managmentView',
        component: () => import('@/views/managment/managmentView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/AccountingTrade',
        name: 'AccountingTrade',
        component: () => import('@/views/acconting/AccountingTradeView.vue'),
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
