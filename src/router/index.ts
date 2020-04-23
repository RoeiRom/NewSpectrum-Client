import Vue from 'vue';
import VueRouter from 'vue-router';
import News from '@/views/News.vue';
import Calendar from '../views/Calendar.vue';
import Downloads from '../views/Downloads.vue';
import FoodOrder from '../views/FoodOrder.vue';

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
    component: Downloads,
  },
  {
    path: '/orderFood',
    component: FoodOrder,
  },
  {
    path: '/news',
    component: News,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
