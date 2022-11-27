import { createRouter, createWebHistory } from 'vue-router';

import ForceGraph from '@/views/ForceGraph.vue';
import TimeLine from '@/views/TimeLine.vue';
import MySelector from '@/views/MySelector.vue';

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: MySelector,
    meta: {
      enter: 'animate__animated animate__slideInUp',
      leave: 'animate__animated animate__slideOutDown',
    },
  },
  {
    path: '/ForceGraph',
    name: 'ForceGraph',
    component: ForceGraph,
    meta: {
      enter: 'animate__animated animate__slideInUp',
      leave: 'animate__animated animate__slideOutDown',
    },
  },
  {
    path: '/TimeLine',
    name: 'TimeLine',
    component: TimeLine,
    meta: {
      enter: 'animate__animated animate__slideInUp',
      leave: 'animate__animated animate__slideOutDown',
    },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'Home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-red-500',
});

export default router;
