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
      // badgeContent: 'Pro',
      // badgeClass: 'bg-light-primary text-primary',
    }" />
    <VerticalNavLink :item="{
      title: 'کارت به شبا',
      icon: 'ri-bank-card-line',
      href: '#',
      to: '/VerifyCart'
      // badgeContent: 'Pro',
      // badgeClass: 'bg-light-primary text-primary',
    }" />
    <VerticalNavLink :item="{
      title: 'تطبیق کد ملی',
      icon: 'ri-id-card-line',
      href: '#',
      to: '/VerifyPostcode'
      // badgeContent: 'Pro',
      // badgeClass: 'bg-light-primary text-primary',
    }" />
    <VerticalNavLink :item="{
      title: 'استعلام اعتبار',
      icon: 'ri-bank-line',
      href: '#',
      to: '/VerifyCredit'
      // badgeContent: 'Pro',
      // badgeClass: 'bg-light-primary text-primary',
    }" />
  </VerticalNavGroup>


  <VerticalNavSectionTitle :item="{
    heading: 'آمار',
  }" />

  <!-- <VerticalNavLink
    :item="{
      title: 'Account Settings',
      icon: 'ri-user-settings-line',
      to: '/account-settings',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Login',
      icon: 'ri-login-box-line',
      to: '/login',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Register',
      icon: 'ri-user-add-line',
      to: '/register',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Error',
      icon: 'ri-information-line',
      to: '/no-existence',
    }"
  />

  
  <VerticalNavSectionTitle
    :item="{
      heading: 'User Interface',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Typography',
      icon: 'ri-text',
      to: '/typography',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Icons',
      icon: 'ri-remixicon-line',
      to: '/icons',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Cards',
      icon: 'ri-bar-chart-box-line',
      to: '/cards',
    }"
  />

  <VerticalNavSectionTitle
    :item="{
      heading: 'Forms & Tables',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Form Layouts',
      icon: 'ri-layout-4-line',
      to: '/form-layouts',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Form Validation',
      icon: 'ri-checkbox-multiple-line',
      href: 'https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/forms/form-validation',
      target: '_blank',
      badgeContent: 'Pro',
      badgeClass: 'bg-light-primary text-primary',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Form Wizard',
      icon: 'ri-git-commit-line',
      href: 'https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/forms/form-wizard-numbered',
      target: '_blank',
      badgeContent: 'Pro',
      badgeClass: 'bg-light-primary text-primary',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Tables',
      icon: 'ri-table-alt-line',
      to: '/tables',
    }"
  />

  <VerticalNavSectionTitle
    :item="{
      heading: 'Others',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Access Control',
      icon: 'ri-shield-line',
      href: 'https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/access-control',
      target: '_blank',
      badgeContent: 'Pro',
      badgeClass: 'bg-light-primary text-primary',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Documentation',
      icon: 'ri-article-line',
      href: 'https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/documentation/',
      target: '_blank',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Raise Support',
      href: 'https://github.com/themeselection/materio-vuetify-vuejs-admin-template-free/issues',
      icon: 'ri-lifebuoy-line',
      target: '_blank',
    }"
  /> -->
</template>
