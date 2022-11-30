import { createRouter, createWebHistory } from 'vue-router';

import ForceGraph from '@/views/ForceGraph.vue';
import TimeLine from '@/views/TimeLine.vue';
import MySelector from '@/views/MySelector.vue';
import Welcome from '@/views/Welcome.vue';
import MyReport from '@/views/MyReport.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Welcome,
    meta: {
      index: 0,
      transitionName: 'slide-up',
    },
  },
  {
    path: '/selector',
    name: 'Selector',
    component: MySelector,
    meta: {
      index: 1,
      transitionName: 'slide-up',
    },
  },
  {
    path: '/Report',
    name: 'Report',
    component: MyReport,
    meta: {
      index: 2,
      transitionName: 'slide-down',
    },
  },
  {
    path: '/ForceGraph',
    name: 'ForceGraph',
    component: ForceGraph,
    meta: {
      index: 3,
      transitionName: 'slide-down',
    },
  },
  {
    path: '/TimeLine',
    name: 'TimeLine',
    component: TimeLine,
    meta: {
      index: 4,
      transitionName: 'slide-down',

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

router.afterEach((to, from) => {
  const toDepth = to.meta.index;
  const fromDepth = from.meta.index;
  // eslint-disable-next-line
  to.meta.transitionName = toDepth > fromDepth ? 'slide-up' : 'slide-down';
});

export default router;
