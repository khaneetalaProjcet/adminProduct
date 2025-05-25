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
        path: '/managmentAdmin',
        name: 'managmentAdmin',
        component: () => import('@/views/managment/managmentAdminView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/managmentActivity',
        name: 'managmentActivity',
        component: () => import('@/views/managment/managmentActivityView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/AccountingTrade',
        name: 'AccountingTrade',
        component: () => import('@/views/acconting/AccountingTradeView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/AccountingSellTrade',
        name: 'AccountingSellTrade',
        component: () => import('@/views/acconting/AccountingSellTrade.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/installmentLanding',
        name: 'installmentLanding',
        component: () => import('@/views/landing/installmentLandingView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/recruitmentLanding',
        name: 'recruitmentLanding',
        component: () => import('@/views/landing/recruitmentLandingView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/serverMonitor',
        name: 'serverMonitor',
        component: () => import('@/views/server/serverMonitorView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/TotalReport',
        name: 'TotalReport',
        component: () => import('@/views/report/TotalReportView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/remittanceTrade',
        name: 'remittanceTrade',
        component: () => import('@/views/remittance/remittanceTradeView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/remiitanceBuy',
        name: 'remiitanceBuy',
        component: () => import('@/views/remittance/remiitanceBuyView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/remiitanceSell',
        name: 'remiitanceSell',
        component: () => import('@/views/remittance/remiitanceSellView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/inPersonTrade',
        name: 'inPersonTrade',
        component: () => import('@/views/inperson/inpersonTradeView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/inpersonBuy',
        name: 'inpersonBuy',
        component: () => import('@/views/inperson/inpersonBuyView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/inpersonSell',
        name: 'inpersonSell',
        component: () => import('@/views/inperson/inpersonSellView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/inpersonConvertTrade',
        name: 'inpersonConvertTrade',
        component: () => import('@/views/inperson/inpersonConvertTradeView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/inpersonCounterTrade',
        name: 'inpersonCounterTrade',
        component: () => import('@/views/inperson/inpersonCounterTrade.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/inpersonWithdraw',
        name: 'inpersonWithdraw',
        component: () => import('@/views/inperson/inpersonWithdrawView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/Overview',
        name: 'Overview',
        component: () => import('@/views/report/OverviewView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/goldPriceSetting',
        name: 'goldPriceSetting',
        component: () => import('@/views/goldprice/goldpriceSettingView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/transfer',
        name: 'transfer',
        component: () => import('@/views/transfer/TransferView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/branch',
        name: 'branch',
        component: () => import('@/views/managment/branchView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/AccountingTransfer',
        name: 'AccountingTransfer',
        component: () => import('@/views/transfer/AccountingTransferView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/AccountingUseGold',
        name: 'AccountingUseGold',
        component: () => import('@/views/usegold/AccountingUseGoldView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/userReport',
        name: 'userReport',
        component: () => import('@/views/users/userReportView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/inquiry',
        name: 'inquiry',
        component: () => import('@/views/transfer/InquiryView.vue'),
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
