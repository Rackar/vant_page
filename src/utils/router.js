import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/list"
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
      name: "home",
      path: "/home",
      component: () =>
        import(/* webpackChunkName: "home" */ "../pages/home.vue")
    },
    {
      name: "my",
      path: "/my",
      component: () => import(/* webpackChunkName: "my" */ "../pages/my.vue")
    },
    {
      name: "list",
      path: "/list",
      component: () =>
        import(/* webpackChunkName: "personlist" */ "../pages/personlist.vue")
    },

    {
      name: "single",
      path: "/single/:id",
      component: () =>
        import(
          /* webpackChunkName: "singlePerson" */ "../pages/singlePerson.vue"
        )
    },

    {
      name: "personCreate",
      path: "/personCreate",
      component: () =>
        import(
          /* webpackChunkName: "personCreate" */ "../pages/PersonCreate.vue"
        )
    }
  ]
});
