import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

import Login from '../views/login.vue'
import Habits from '../views/habits.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/habits',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false },
    },
    {
      path: '/habits',
      name: 'Habits',
      component: Habits,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to) => {
  const { data } = await supabase.auth.getSession()
  const session = data.session

  if (to.meta.requiresAuth && !session) {
    return '/login'
  }

  if (to.path === '/login' && session) {
    return '/habits'
  }
})

export default router