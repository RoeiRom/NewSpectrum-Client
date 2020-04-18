import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import VueRouter, { RouteConfig } from 'vue-router';

import StoreModule from '@/store/storeModule';
import store from '@/store';
import Try from '@/views/Try.vue';
import Login from '@/views/Login.vue';
import Calendar from '@/views/Calendar.vue';
import Downloads from '@/views/Downloads.vue';

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
  },
  {
    path: '/downloads',
    component: Downloads,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/' && storeModule.userId !== '') {
    next('/calendar');
  } else if (to.path !== '/' && (to.name === null || storeModule.userId === '')) {
    next('/');
  } else {
    next();
  }
});

export default router;
