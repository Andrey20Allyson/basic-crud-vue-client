import HomeView from '@/views/HomeView.vue'
import UserListView from '@/views/UserListView.vue'
import UserView from '@/views/UserView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/users',
      name: 'Usuários',
      component: UserListView,
    },
    {
      path: '/users/:id',
      name: 'Usuário',
      component: UserView,  
    },
    {
      path: '/register',
      name: 'Registrar',
      component: () => import('@/views/UserRegisterView.vue'),
    }
  ]
})

export default router
