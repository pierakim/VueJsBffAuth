import Auth0Service from "@/services/Auth0Service";
import store from "@/store";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const auth0Service = new Auth0Service();

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  // },

  // {
  //   // /search/screens -> /search?q=screens
  //   path: "/login",
  //   redirect: () => {
  //     // the function receives the target route as the argument
  //     // we return a redirect path/location here.
  //     return { path: "/bff/login" };
  //   },
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeResolve(async (from, to) => {
  console.log(`Index - beforeEach`);
  // let isAuthenticated = false;
  console.log(`from: ` + JSON.stringify(from));
  console.log(`to: ` + JSON.stringify(to));
  console.log(
    `Index - beforeEach - store.getters.isUserAuthenticatedState: ` +
      store.getters.isUserAuthenticatedState
  );
  debugger;
  await auth0Service.getUserClaimFromBFF();
  debugger;
  // next();
});

export default router;
