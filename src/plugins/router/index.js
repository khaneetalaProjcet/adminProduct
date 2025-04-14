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
    console.log(response.data);
    let data = response.data;
    return response
  } catch (error) {
    if (error.response.status == 401) {
      localStorage.clear();
      router.replace("/login");
    }
    console.error('ارور token', error)
  }
}

// const clearAuthData = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('permissions');
// }


router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const permissions = JSON.parse(localStorage.getItem("permissions")) || [];


  if (!to.meta.requiresAuth && isAuthenticated) {
    checkTokenValidity()
  }


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
