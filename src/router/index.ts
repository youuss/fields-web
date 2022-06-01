/**
 * @Description
 * @Author youus
 * @Date 2022/6/1 21:42
 * @Version v1.0.0
 *
 * Hello, humor
 */

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import(/* webpackChunkName: "main" */ '../pages/Main.vue'),
    },
  ],
});

export default router;
