import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import VueRouter, { RouteConfig } from 'vue-router';

import StoreModule from '@/store/storeModule';
import store from '@/store';
import apollo from '@/plugins/apollo';
import Try from '@/views/Try.vue';
import Login from '@/views/Login.vue';
import Calendar from '@/views/Calendar.vue';
import Downloads from '@/views/Downloads.vue';
import { getLoggedInUser } from '@/db-service/Users/queries';
import User from '@/models/User';

Vue.use(VueRouter);

const storeModule = getModule(StoreModule, store);

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/calendar',
  },
  {
    path: '/news',
    component: Try,
    meta: {
      requiresAuth: true,
    },
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === null) {
    next('/');
  } else if (to.meta.requiresAuth && storeModule.userId === '') {
    next('/login');
  } else {
    next();
  }
});

export default router;
