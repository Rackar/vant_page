import Vue from 'vue'
import App from './App.vue'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
// Vue.use(Lazyload, lazyOption);

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3002/'
// var token = window.localStorage.getItem("token");
//请求拦截。所有http请求增加token
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': ' application/json'
    }

    return config
  },
  err => {
    return Promise.reject(err)
  }
)
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

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
