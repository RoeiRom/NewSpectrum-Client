import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Calendar from '../views/Calendar.vue';
import Downloads from '../views/Downloads.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: Login,
  },
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
    component: Downloads,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
