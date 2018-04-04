module.exports = `import Vue from 'vue'
import Router from 'vue-router';
// home模块
import home from "./home";

// 结构
const MainView = resolve => require(['@/modules/mainView'], resolve)
// 404
const Fview = resolve => require(['@/modules/fof'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      component: MainView,
      
     // name: "main",
      children: [
        ...home,
        // -----------------------------------404---------------------------------------
        {
          path: "*",
          alias: "404",
          name: "fof",
          component: Fview
        }
      ]
    }
  ]
})`