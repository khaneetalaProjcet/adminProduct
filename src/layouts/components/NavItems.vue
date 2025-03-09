<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <VerticalNavLink :item="{
    title: 'داشبورد',
    icon: 'ri-home-smile-line',
    to: '/dashboard',
  }" />

  <VerticalNavSectionTitle :item="{
    heading: 'کاربران',
  }" />

  <VerticalNavGroup :item="{
    title: 'احراز هویت',
    icon: 'ri-fingerprint-line',
  }">
    <VerticalNavLink :item="{
      title: 'شاهکار',
      icon: 'ri-shield-keyhole-line',
      href: '#',
      to: '/VerifyShahkar'
      // badgeContent: 'Pro',
      // badgeClass: 'bg-light-primary text-primary',
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
  </VerticalNavGroup>

  <VerticalNavGroup :item="{
    title: 'کاربران',
    icon: 'ri-user-line',
  }">
    <VerticalNavLink :item="{
      title: 'اطلاعات',
      icon: 'ri-id-card-line',
      href: '#',
      to: '/userView'
    }" />
  </VerticalNavGroup>


  <VerticalNavSectionTitle :item="{
    heading: 'مالی',
  }" />


  <VerticalNavGroup :item="{
    title: 'کیف پول',
    icon: 'ri-wallet-3-line',
  }">
    <VerticalNavLink :item="{
      title: 'کیف پول کاربران',
      icon: 'ri-money-dollar-box-line',
      href: '#',
      to: '/walletView'
    }" />
    <VerticalNavLink :item="{
      title: 'برداشت',
      icon: 'ri-bar-chart-box-line',
      href: '#',
      to: '/withdrawWallet'
    }" />
    <VerticalNavLink :item="{
      title: 'واریز',
      icon: 'ri-refund-2-line',
      href: '#',
      to: '/depositWallet'
    }" />
  </VerticalNavGroup>


  <VerticalNavSectionTitle :item="{
    heading: 'معاملات',
  }" />

  <VerticalNavGroup :item="{
    title: 'صندوق طلا',
    icon: 'ri-line-chart-line',
  }">
    <VerticalNavLink :item="{
      title: 'خرید',
      icon: 'ri-bar-chart-line',
      href: '#',
      to: '/goldboxBuy'
    }" />
    <VerticalNavLink :item="{
      title: 'فروش',
      icon: 'ri-bar-chart-grouped-line',
      href: '#',
      to: '/goldboxSell'
    }" />
    <VerticalNavLink :item="{
      title: 'ثبت معامله',
      icon: 'ri-pie-chart-line',
      href: '#',
      to: '/goldboxTrade'
    }" />
  </VerticalNavGroup>
</template>
