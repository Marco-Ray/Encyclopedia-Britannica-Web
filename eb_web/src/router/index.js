import { createRouter, createWebHistory } from 'vue-router';

import ForceGraph from '@/views/ForceGraph.vue';
import TimeLine from '@/views/TimeLine.vue';
import MySelector from '@/views/MySelector.vue';
import Welcome from '@/views/Welcome.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Welcome,
    meta: {
      enter: 'animate__animated animate__slideInUp',
      leave: 'animate__animated animate__slideOutUp',
    },
  },
  {
    path: '/selector',
    name: 'Selector',
    component: MySelector,
    meta: {
      enter: 'animate__animated animate__slideInUp',
      leave: 'animate__animated animate__slideOutUp',
    },
  },
  {
    path: '/ForceGraph',
    name: 'ForceGraph',
    component: ForceGraph,
    meta: {
      enter: 'animate__animated animate__slideInUp',
      leave: 'animate__animated animate__slideOutUp',
    },
  },
  {
    path: '/TimeLine',
    name: 'TimeLine',
    component: TimeLine,
    meta: {
      enter: 'animate__animated animate__slideInUp',
      leave: 'animate__animated animate__slideOutUp',
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
