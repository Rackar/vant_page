import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/star"
      // name: "login",
      // component: () => import("./jianshu/login.vue")
    },
    {
      name: "login",
      path: "/login",
      component: () =>
        import(/* webpackChunkName: "login" */ "../pages/login.vue")
    },
    {
      name: "signup",
      path: "/signup",
      component: () =>
        import(/* webpackChunkName: "signup" */ "../pages/signup.vue")
    },

    {
      name: "star",
      path: "/star",
      meta: { requiresAuth: true },
      component: () =>
        import(
          /* webpackChunkName: "personCreate" */
          "../pages/star.vue"
        )
    }
  ]
});
