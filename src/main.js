import Vue from "vue";
import App from "./App.vue";
import router from "./utils/router";
import store from "./utils/store";

import Vant from "vant";
import "vant/lib/index.css";
import {
  Lazyload
} from 'vant';
let lazyOption = {
  loading: '/img/loading.jpg',
  error: '/img/loading.jpg'
}
Vue.use(Vant);
// Vue.use(Lazyload, lazyOption);
Vue.use(Lazyload);
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3002/";
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
// axios.interceptors.response.use(
//   function (response) {
//     // 用户信息是否超时，重定向到登录页面
//     // debugger;
//     if (response.data.status === 0) {
//       localStorage.clear();
//       router.replace({
//         path: "/login",
//         query: {
//           redirect: router.currentRoute.fullPath
//         }
//       });
//       Vant.Toast("请登录后操作");
//     }
//     return response;
//   },
//   function (error) {
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");