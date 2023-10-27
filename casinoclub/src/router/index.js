import { createRouter, createWebHistory } from "vue-router";
import {paths} from './path'

const routes = paths.router;

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

export default router;
