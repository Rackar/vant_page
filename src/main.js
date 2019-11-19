import Vue from "vue";
import App from "./App.vue";

import store from "./utils/store";
import router from "./utils/router";
import Vant from "vant";
import "vant/lib/index.css";
import { Lazyload } from "vant";
let lazyOption = {
  loading: "/img/loading.jpg",
  error: "/img/loading.jpg"
};
Vue.use(Vant);
// Vue.use(Lazyload, lazyOption);
Vue.use(Lazyload);
import axios from "axios";
let mainUrl =
  process.env.NODE_ENV === "production"
    ? "http://49.232.137.34:3006/"
    : "http://localhost:3006/";
axios.defaults.baseURL = mainUrl;
// var token = window.localStorage.getItem("token");
//请求拦截。所有http请求增加token
axios.interceptors.request.use(
  config => {
    config.headers = {
      "Content-Type": " application/json"
    };
    if (store.state.token) {
      config.headers.Authorization = `${store.state.token}`;
    }
    // config.headers[] = localStorage.token;
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  function(response) {
    // 用户信息是否超时，重定向到登录页面
    // debugger;
    if (response.status != 200) {
      localStorage.clear();
      router.replace({
        path: "/login",
        query: {
          redirect: router.currentRoute.fullPath
        }
      });
      Vant.Toast("请登录后操作");
    }
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.prototype.$axios = axios;
Vue.prototype.$imgServer = mainUrl;
Vue.config.productionTip = false;

router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.token) {
      next({
        name: "login"
      });
    } else {
      next();
    }
  } else {
    next(); // 确保一定要调用 next()
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
