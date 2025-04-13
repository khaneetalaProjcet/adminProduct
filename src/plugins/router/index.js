import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const checkTokenValidity = async () => {
  const token = localStorage.getItem('token')
  if (!token) return false
  
  try {
    // در اینجا باید API واقعی خود را فراخوانی کنید
    const response = await fetch('/api/auth/validate-token', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (!response.ok) {
      localStorage.removeItem('token')
      localStorage.removeItem('permissions')
      return false
    }
    
    const data = await response.json()
    return data.valid
  } catch (error) {
    localStorage.removeItem('token')
    localStorage.removeItem('permissions')
    return false
  }
}




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
