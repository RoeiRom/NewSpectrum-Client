import Vue from 'vue';
import VueRouter from 'vue-router';
import Calendar from '../views/Calendar.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/calendar',
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/downloads',
    component: Calendar,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
