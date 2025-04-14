import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import UserService from '@/services/user/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


const checkTokenValidity = async () => {
  try {
    const response = await UserService.CheckToken();

    console.log(response.data)
    if (!response.ok) {
      clearAuthData();
      return false
    }

    console.log(response.data)

    if (!data.valid) {
      clearAuthData()
      return false
    }
    return true
  } catch (error) {
    console.error('ارور token', error)
    clearAuthData()
    return false
  }
}

const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('permissions');
}


// router.beforeEach(async (to, from, next) => {
//   const isAuthenticated = !!localStorage.getItem('token');
//   const permissions = JSON.parse(localStorage.getItem("permissions")) || [];

//   // اگر کاربر در حال رفتن به صفحه لاگین است، اجازه دهید ادامه دهد
//   if (to.name === 'login') {
//     return next()
//   }
//   // اگر کاربر احراز هویت نشده است
//   if (!isAuthenticated) {
//     clearAuthData()
//     return next({ name: 'login' })
//   }

//   // بررسی اعتبار توکن
//   const isValid = await checkTokenValidity()
//   if (!isValid) {
//     return next({ name: 'login' })
//   }

//   // بررسی مجوزها
//   if (to.name && !permissions.includes(to.name)) {
//     // می‌توانید به صفحه 403 یا dashboard هدایت کنید
//     return next({ name: 'dashboard' })
//   }

//   next()
// })




router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const permissions = JSON.parse(localStorage.getItem("permissions")) || [];
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' });
  } else if (to.meta.requiresAuth && !permissions.includes(to.name)) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default function (app) {
  app.use(router)
}
export { router }
