import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/converters/:name?",
    name: "converters",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Converters.vue"),
  },
  // NOT FOUND
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
