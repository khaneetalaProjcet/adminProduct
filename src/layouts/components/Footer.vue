<template>
  <div class="h-100 d-flex align-center justify-md-space-between justify-center">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      ساخته شده
      <VIcon
        icon="ri-heart-line"
        color="error"
        size="1.25rem"
        class="mx-1"
      />
      توسط <a
        href="https://themeselection.com"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >تیم فنی خانه طلا</a>
    </span>
    <!-- 👉 Footer: right content -->
    <span class="d-md-flex gap-x-4 text-primary d-none">
      <a
        href="#"
        target="noopener noreferrer"
      >ورژن ها</a>
      <a
        href="#"
        target="noopener noreferrer"
      >مستندات</a>
      <a
        href="#"
        target="noopener noreferrer"
      >پشتیبانی</a>
      <a
        href="#"
        target="noopener noreferrer"
      >آیکون ها</a>
    </span>
  </div>
</template>
