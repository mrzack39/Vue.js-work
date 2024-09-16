import { createRouter, createWebHistory } from 'vue-router';
import DashboardContent from '@/components/DashboardContent.vue';
import LiAccountsReference from '@/components/LiAccountsReference.vue';
import Li_accounts_Stages from '@/components/Li_accounts_Stages.vue';
import Li_accounts_Type from '@/components/Li_accounts_Type.vue';
import Li_accounts_status from '@/components/Li_accounts_status.vue';
import UserLogin from '@/components/UserLogin.vue'; 

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardContent,
    meta: { requiresAuth: true },
  },
  {
    path: '/accounts-references',
    name: 'LiAccountsReference',
    component: LiAccountsReference,
    meta: { requiresAuth: true },
  },
  {
    path: '/accounts-status',
    name: 'Li_accounts_status',
    component: Li_accounts_status,
    meta: { requiresAuth: true },
  },
  {
    path: '/accounts-stages',
    name: 'Li_accounts_Stages',
    component: Li_accounts_Stages,
    meta: { requiresAuth: true },
  },
  {
    path: '/accounts-type',
    name: 'Li_accounts_Type',
    component: Li_accounts_Type,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'UserLogin' });
  } else {
    next();
  }
});

export default router;
