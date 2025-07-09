<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'


const hasPermission = (routeName) => {
  return JSON.parse(localStorage.getItem("permissions") || "[]").includes(routeName);
};

</script>

<template>
  <VerticalNavLink :item="{
    title: 'داشبورد',
    icon: 'ri-home-smile-line',
    to: '/Dashboard',
  }" />

  <VerticalNavSectionTitle v-if="hasPermission('userView')" :item="{
    heading: 'کاربران',
  }" />

  <!-- <VerticalNavGroup :item="{
    title: 'احراز هویت',
    icon: 'ri-fingerprint-line',
  }">
    <VerticalNavLink :item="{
      title: 'شاهکار',
      icon: 'ri-shield-keyhole-line',
      href: '#',
      to: '/VerifyShahkar'
    }" />
    <VerticalNavLink :item="{
      title: 'هویت حقیقی',
      icon: 'ri-user-follow-line',
      href: '#',
      to: '/VerifyPerson'
    }" />
    <VerticalNavLink :item="{
      title: 'کارت به شبا',
      icon: 'ri-bank-card-line',
      href: '#',
      to: '/VerifyCart'
    }" />
    <VerticalNavLink :item="{
      title: 'تطبیق کد ملی',
      icon: 'ri-id-card-line',
      href: '#',
      to: '/VerifyPostcode'
    }" />
    <VerticalNavLink :item="{
      title: 'استعلام اعتبار',
      icon: 'ri-bank-line',
      href: '#',
      to: '/VerifyCredit'
    }" />
  </VerticalNavGroup> -->

  <VerticalNavGroup v-if="hasPermission('userView') || hasPermission('userReport') || hasPermission('addUser')" :item="{
    title: 'کاربران',
    icon: 'ri-user-line',
  }">
    <VerticalNavLink v-if="hasPermission('userView')" :item="{
      title: 'اطلاعات',
      icon: 'ri-id-card-line',
      href: '#',
      to: '/userView',
      // badgeContent: 'Pro',
      // badgeClass: 'bg-light-primary text-primary',
    }" />
    <VerticalNavLink v-if="hasPermission('userReport')" :item="{
      title: 'گزارش مالی',
      icon: 'ri-money-euro-box-line',
      href: '#',
      to: '/userReport'
    }" />
    <VerticalNavLink v-if="hasPermission('addUser')" :item="{
      title: 'افزودن کاربر',
      icon: 'ri-user-add-line',
      href: '#',
      to: '/addUser'
    }" />
  </VerticalNavGroup>

  <VerticalNavSectionTitle
    v-if="hasPermission('AccountingTrade') || hasPermission('AccountingSellTrade') || hasPermission('goldboxBuy') || hasPermission('goldboxSell') || hasPermission('remiitanceSell') || hasPermission('remiitanceBuy') || hasPermission('inpersonBuy') || hasPermission('inpersonSell') || hasPermission('walletView') || hasPermission('withdrawWallet') || hasPermission('depositWallet')"
    :item="{
      heading: 'حسابداری',
    }" />

  <VerticalNavGroup v-if="hasPermission('AccountingTrade') || hasPermission('AccountingSellTrade')" :item="{
    title: 'معاملات تلفنی',
    icon: 'ri-user-line',
  }">
    <VerticalNavLink v-if="hasPermission('AccountingTrade')" :item="{
      title: 'خرید تلفنی',
      icon: 'ri-survey-line',
      href: '#',
      to: '/AccountingTrade'
    }" />
    <VerticalNavLink v-if="hasPermission('AccountingSellTrade')" :item="{
      title: 'فروش تلفنی',
      icon: 'ri-creative-commons-nc-line',
      href: '#',
      to: '/AccountingSellTrade'
    }" />
  </VerticalNavGroup>

  <VerticalNavGroup v-if="hasPermission('goldboxBuy') || hasPermission('goldboxSell')" :item="{
    title: 'معاملات آنلاین',
    icon: 'ri-line-chart-line',
  }">
    <VerticalNavLink v-if="hasPermission('goldboxBuy')" :item="{
      title: 'خرید آنلاین',
      icon: 'ri-bar-chart-line',
      href: '#',
      to: '/goldboxBuy'
    }" />
    <VerticalNavLink v-if="hasPermission('goldboxSell')" :item="{
      title: 'فروش آنلاین',
      icon: 'ri-bar-chart-grouped-line',
      href: '#',
      to: '/goldboxSell'
    }" />
  </VerticalNavGroup>

  <VerticalNavGroup v-if="hasPermission('remiitanceSell') || hasPermission('remiitanceBuy')" :item="{
    title: 'حواله',
    icon: 'ri-file-chart-line',
  }">
    <VerticalNavLink v-if="hasPermission('remiitanceSell')" :item="{
      title: 'فروش حواله ای',
      icon: 'ri-file-upload-line',
      href: '#',
      to: '/remiitanceSell'
    }" />
    <VerticalNavLink v-if="hasPermission('remiitanceBuy')" :item="{
      title: 'خرید حواله ای',
      icon: 'ri-file-download-line',
      href: '#',
      to: '/remiitanceBuy'
    }" />
  </VerticalNavGroup>

  <VerticalNavGroup v-if="hasPermission('inpersonBuy') || hasPermission('inpersonSell')" :item="{
    title: 'معاملات حضوری',
    icon: 'ri-user-5-line',
  }">
    <VerticalNavLink v-if="hasPermission('inpersonBuy')" :item="{
      title: 'خرید حضوری',
      icon: 'ri-group-line',
      href: '#',
      to: '/inpersonBuy'
    }" />
    <VerticalNavLink v-if="hasPermission('inpersonSell')" :item="{
      title: 'فروش حضوری',
      icon: 'ri-group-3-line',
      href: '#',
      to: '/inpersonSell'
    }" />
  </VerticalNavGroup>


  <VerticalNavGroup
    v-if="hasPermission('walletView') || hasPermission('withdrawWallet') || hasPermission('depositWallet')" :item="{
      title: 'کیف پول',
      icon: 'ri-wallet-3-line',
    }">
    <VerticalNavLink v-if="hasPermission('walletView')" :item="{
      title: 'کیف پول کاربران',
      icon: 'ri-money-dollar-box-line',
      href: '#',
      to: '/walletView'
    }" />
    <VerticalNavLink v-if="hasPermission('withdrawWallet')" :item="{
      title: 'برداشت',
      icon: 'ri-bar-chart-box-line',
      href: '#',
      to: '/withdrawWallet'
    }" />
    <VerticalNavLink v-if="hasPermission('depositWallet')" :item="{
      title: 'واریز',
      icon: 'ri-refund-2-line',
      href: '#',
      to: '/depositWallet'
    }" />
  </VerticalNavGroup>



  <VerticalNavGroup v-if="hasPermission('AccountingTransfer')" :item="{
    title: 'انتقال',
    icon: 'ri-file-transfer-line',
  }">
    <VerticalNavLink v-if="hasPermission('AccountingTransfer')" :item="{
      title: 'انتقال طلا',
      icon: 'ri-file-transfer-line',
      href: '#',
      to: '/AccountingTransfer'
    }" />
    <VerticalNavLink v-if="hasPermission('AccountingEmergencyTransfer')" :item="{
      title: 'انتقال طلا',
      icon: 'ri-file-transfer-line',
      href: '#',
      to: '/AccountingEmergencyTransfer'
    }" />
  </VerticalNavGroup>


  <VerticalNavGroup v-if="hasPermission('AccountingUseGold')" :item="{
    title: 'استفاده',
    icon: 'ri-diamond-ring-line',
  }">
    <VerticalNavLink v-if="hasPermission('AccountingUseGold')" :item="{
      title: 'استفاده از طلا',
      icon: 'ri-diamond-ring-line',
      href: '#',
      to: '/AccountingUseGold'
    }" />
  </VerticalNavGroup>




  <VerticalNavSectionTitle
    v-if="hasPermission('goldboxTrade') || hasPermission('remittanceTrade') || hasPermission('inPersonTrade')" :item="{
      heading: 'ثبت معامله',
    }" />

  <VerticalNavGroup v-if="hasPermission('goldboxTrade')" :item="{
    title: 'معامله تلفنی',
    icon: 'ri-line-chart-line',
  }">

    <VerticalNavLink v-if="hasPermission('goldboxTrade')" :item="{
      title: 'ثبت معامله',
      icon: 'ri-pie-chart-line',
      href: '#',
      to: '/goldboxTrade'
    }" />
  </VerticalNavGroup>

  <VerticalNavGroup v-if="hasPermission('remittanceTrade')" :item="{
    title: 'معامله حواله ای',
    icon: 'ri-article-line',
  }">
    <VerticalNavLink v-if="hasPermission('remittanceTrade')" :item="{
      title: 'ثبت حواله',
      icon: 'ri-news-line',
      href: '#',
      to: '/remittanceTrade'
    }" />
  </VerticalNavGroup>

  <VerticalNavGroup
    v-if="hasPermission('inPersonTrade') || hasPermission('inpersonConvertTrade') || hasPermission('inpersonCounterTrade')"
    :item="{
      title: 'معامله حضوری',
      icon: 'ri-store-2-line',
    }">
    <VerticalNavLink v-if="hasPermission('inPersonTrade')" :item="{
      title: 'ثبت سفارش',
      icon: 'ri-shopping-bag-4-line',
      href: '#',
      to: '/inPersonTrade'
    }" />
    <VerticalNavLink v-if="hasPermission('inpersonConvertTrade')" :item="{
      title: 'تبدیل طلا',
      icon: 'ri-swap-box-line',
      href: '#',
      to: '/inpersonConvertTrade'
    }" />
    <VerticalNavLink v-if="hasPermission('inpersonCounterTrade')" :item="{
      title: 'استفاده',
      icon: 'ri-store-2-line',
      href: '#',
      to: '/inpersonCounterTrade'
    }" />
    <VerticalNavLink v-if="hasPermission('inpersonWithdraw')" :item="{
      title: 'برداشت کیف پول',
      icon: 'ri-repeat-line',
      href: '#',
      to: '/inpersonWithdraw'
    }" />
  </VerticalNavGroup>

  <VerticalNavGroup v-if="hasPermission('transfer') || hasPermission('inquiry') || hasPermission('EmergencyTransfer')"
    :item="{
      title: 'انتقال',
      icon: 'ri-user-shared-line',
    }">
    <VerticalNavLink v-if="hasPermission('transfer')" :item="{
      title: 'انتقال طلا',
      icon: 'ri-user-shared-line',
      href: '#',
      to: '/transfer'
    }" />
    <VerticalNavLink v-if="hasPermission('inquiry')" :item="{
      title: 'استعلام صندوق طلا',
      icon: 'ri-menu-search-line',
      href: '#',
      to: '/inquiry'
    }" />
    <VerticalNavLink v-if="hasPermission('EmergencyTransfer')" :item="{
      title: 'انتقال اضطراری',
      icon: 'ri-swap-box-line',
      href: '#',
      to: '/EmergencyTransfer'
    }" />
  </VerticalNavGroup>

  <VerticalNavSectionTitle v-if="hasPermission('managmentAdmin') || hasPermission('managmentActivity')" :item="{
    heading: 'مدیریت',
  }" />

  <VerticalNavGroup
    v-if="hasPermission('managmentAdmin') || hasPermission('managmentActivity') || hasPermission('goldPriceSetting') || hasPermission('branch')"
    :item="{
      title: 'مدیریت',
      icon: 'ri-admin-line',
    }">
    <VerticalNavLink v-if="hasPermission('managmentAdmin')" :item="{
      title: 'ادمین',
      icon: 'ri-admin-line',
      href: '#',
      to: '/managmentAdmin'
    }" />
    <VerticalNavLink v-if="hasPermission('managmentActivity')" :item="{
      title: 'فعالیت ها',
      icon: 'ri-user-settings-line',
      href: '#',
      to: '/managmentActivity'
    }" />
    <VerticalNavLink v-if="hasPermission('goldPriceSetting')" :item="{
      title: 'تنظیم قیمت طلا',
      icon: 'ri-price-tag-3-line',
      href: '#',
      to: '/goldPriceSetting'
    }" />
    <VerticalNavLink v-if="hasPermission('branch')" :item="{
      title: 'شعبه ها',
      icon: 'ri-store-line',
      href: '#',
      to: '/branch'
    }" />
  </VerticalNavGroup>

  <VerticalNavSectionTitle v-if="hasPermission('installmentLanding')" :item="{
    heading: 'لندینگ',
  }" />

  <VerticalNavGroup v-if="hasPermission('installmentLanding') || hasPermission('recruitmentLanding')" :item="{
    title: 'لندینگ ها',
    icon: 'ri-pages-line',
  }">
    <VerticalNavLink v-if="hasPermission('installmentLanding')" :item="{
      title: 'فروش اقساطی',
      icon: 'ri-funds-line',
      href: '#',
      to: '/installmentLanding'
    }" />
    <VerticalNavLink v-if="hasPermission('recruitmentLanding')" :item="{
      title: 'استخدام',
      icon: 'ri-user-search-line',
      href: '#',
      to: '/recruitmentLanding'
    }" />
  </VerticalNavGroup>


  <VerticalNavSectionTitle v-if="hasPermission('serverMonitor')" :item="{
    heading: 'سرور',
  }" />


  <VerticalNavGroup v-if="hasPermission('serverMonitor')" :item="{
    title: 'سرور',
    icon: 'ri-computer-line',
  }">
    <VerticalNavLink v-if="hasPermission('serverMonitor')" :item="{
      title: 'مانیتور سرور',
      icon: 'ri-server-line',
      href: '#',
      to: '/serverMonitor'
    }" />
  </VerticalNavGroup>


  <VerticalNavSectionTitle v-if="hasPermission('TotalReport')" :item="{
    heading: 'گزارشات',
  }" />


  <VerticalNavGroup v-if="hasPermission('TotalReport') || hasPermission('Overview')" :item="{
    title: 'گزارشات',
    icon: 'ri-file-chart-2-line',
  }">
    <VerticalNavLink v-if="hasPermission('TotalReport')" :item="{
      title: 'گزارش جامع',
      icon: 'ri-folder-chart-line',
      href: '#',
      to: '/TotalReport'
    }" />
    <VerticalNavLink v-if="hasPermission('Overview')" :item="{
      title: 'آمار',
      icon: 'ri-donut-chart-line',
      href: '#',
      to: '/Overview'
    }" />
  </VerticalNavGroup>

</template>
