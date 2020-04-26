import Vue from 'vue';
import VueRouter from 'vue-router';
import Calendar from '../views/Calendar.vue';
import Downloads from '../views/Downloads.vue';
import AddEvent from '../components/CalendarComponents/addEvent.vue';
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
    path: '/calender/addEvent',
    component: AddEvent,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
