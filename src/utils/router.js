import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/word"
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
          /* webpackChunkName: "star" */
          "../pages/star.vue"
        )
    },
    {
      name: "word",
      path: "/word",
      component: () =>
        import(/* webpackChunkName: "word" */ "../pages/word.vue")
    },
    {
      name: "calc",
      path: "/calc",
      component: () =>
        import(/* webpackChunkName: "calc" */ "../pages/calc.vue")
    }
  ]
});
