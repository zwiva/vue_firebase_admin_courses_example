import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requirelogin: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    meta: {
      requirelogin: false,
    },
  },
  {
    path: "/registrarse",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignUp.vue"),
    meta: {
      requirelogin: false,
    },
  },
  {
    path: "/administrarcursos",
    name: "DashboardCourses",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DashboardCourses.vue"),
    meta: {
      requirelogin: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requirelogin)
    if (Store.state.session.user) {
      next(); //siguiente
    } else {
      next("/login"); //arg opcional para que lleve para el login
    }
  else {
    next();
  }
});
export default router;
