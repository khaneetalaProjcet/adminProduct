import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import UserService from '@/services/user/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


const checkTokenValidity = async () => {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const response = await UserService.CheckToken();
    if (!response.ok) {
      clearAuthData();
      return false
    }
    const data = await response.json()
    if (!data.valid) {
      clearAuthData()
      return false
    }
    return true
  } catch (error) {
    console.error('Error validating token:', error)
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

//   if (to.meta.requiresAuth) {

//     const isValid = await checkTokenValidity()
//     if (!isValid) {
//       return next({ name: 'login' })
//     }

//     if (!permissions.includes(to.name)) {
//       return next({ name: 'login' })
//     }
//   }
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
