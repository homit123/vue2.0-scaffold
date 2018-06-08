module.exports = `import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';
import * as filters from './filters';
import componentsArray from './config/components';
import axios from 'axios';
import ElementUI from 'element-ui';
import moduleEvent from './event/moduleEvent';
import menus from "./portal/menus/menus";
import storejs from 'storejs';
import config from "@/config/config"

let myPlugin = {}
myPlugin.install = function (vue, options) {
  vue.prototype.$event = moduleEvent;
  // 配置文件服务器地址   appId  AppSecret
  vue.prototype.$fileHeader = { 
    'X-AppID': '58dcb25a5fb9310cd713e18d', 
    'X-AppSecret': 'ac971fc16b6af94562c561bf6d69b353'
  }
  vue.prototype.$getApi = config.getApi;
}

Vue.use(myPlugin);
Vue.use(ElementUI, { size: 'small' });
sync(store, router)

Object.keys(filters).forEach(key => { Vue.filter(key, filters[key]) })
componentsArray.forEach(component => Vue.component(component.name, component.instance) )

storejs.set({menus: menus});
setTimeout(()=>{
  moduleEvent.$emit("menus", menus);
}, 200)

var instanceAxios = axios.create()
instanceAxios.interceptors.request.use(
  function(res) {
    return res
  },
  function(error) {
    moduleEvent.$emit("errorNetWork", '网络异常');
    return Promise.reject(error)
  },
)

// Add a response interceptor
instanceAxios.interceptors.response.use(
  function(response) {
    let resData = response.data;
    if(resData.code == 200) return resData
    else {
        moduleEvent.$emit("errorNetWork", resData.msg);
        return Promise.reject(response);
    }
  },
  function(error) {
    moduleEvent.$emit("errorNetWork", error.message);
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