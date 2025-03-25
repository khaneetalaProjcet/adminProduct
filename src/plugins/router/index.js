import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const permissions = JSON.parse(localStorage.getItem("permissions")) || [];
  console.log(permissions)

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
