import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: {
      layout: "main",
      auth: true,
    },
  },
  {
    path: "/help",
    name: "Help",
    meta: {
      layout: "main",
      auth: true,
    },
    component: () => import("../views/HelpView.vue"),
  },
  {
    path: "/request/:id",
    name: "Request",
    meta: {
      layout: "main",
      auth: true,
    },
    component: () => import("../views/RequestView.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    meta: {
      layout: "auth",
      auth: false,
    },
    component: () => import("../views/AuthView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth;

  if (requireAuth && store.getters["auth/isAuthenticated"]) {
    next();
  } else if (requireAuth && !store.getters["auth/isAuthenticated"]) {
    next("/auth?message=auth");
  } else {
    next();
  }
});

export default router;
