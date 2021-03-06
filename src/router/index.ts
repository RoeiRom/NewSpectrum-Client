import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import VueRouter, { RouteConfig } from 'vue-router';

import StoreModule, { defaultUser } from '@/store/storeModule';
import store from '@/store';
import Login from '@/views/Login.vue';
import Calendar from '@/views/Calendar.vue';
import Downloads from '@/views/Downloads.vue';
import FoodOrder from '../views/FoodOrder.vue';

Vue.use(VueRouter);

const storeModule = getModule(StoreModule, store);

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/calendar',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/calendar',
    component: Calendar,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/downloads',
    component: Downloads,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/orderFood',
    component: FoodOrder,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === null) {
    next('/');
  } else if (to.meta.requiresAuth && storeModule.user === defaultUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
