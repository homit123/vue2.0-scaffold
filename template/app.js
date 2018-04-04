module.exports = `import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';
import * as filters from './filters';
import axios from 'axios';
import ElementUI from 'element-ui';

Vue.use(ElementUI);

sync(store, router)

Object.keys(filters).forEach(key => { Vue.filter(key, filters[key]) })

var instanceAxios = axios.create()
instanceAxios.interceptors.request.use(
  function(res) {
    return res
  },
  function(error) {
    return Promise.reject(error)
  },
)

// Add a response interceptor
instanceAxios.interceptors.response.use(
  function(response) {
    let resData = response.data;
    return resData
  },
  function(error) {
    return Promise.reject(error)
  },
)

instanceAxios.defaults.withCredentials = true
instanceAxios.defaults.timeout = 115000

window.instanceAxios = instanceAxios

const app = new Vue({
  router,
  store,
  render: h => h(App),
})

Vue.config.devtools = process.env.NODE_ENV == 'production' ? false : true;
Vue.config.silent = process.env.NODE_ENV == 'production' ? true : false;
Vue.config.keyCodes = { enter: 13 };

export { app }

`