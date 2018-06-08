module.exports = `import Vue from 'vue'
import Router from 'vue-router';
import moduleEvent from '@/event/moduleEvent';
import storejs from 'storejs';
import sysMenus from "@/portal/menus/menus";
// home模块
import home from "./home";
/*<路由注入>*/
// 结构
const MainView = resolve => require(['@/modules/mainView'], resolve)
// 404
const Fview = resolve => require(['@/modules/fof'], resolve)

Vue.use(Router)

const router =  new Router({
  mode: 'hash',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      component: MainView,
      name: "Main",
      children: [
        ...home,
        /*<模块注入>*/
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
})
let menus = storejs("menus") || sysMenus;
// 处理menus到同级别
var dealMenusStruct = function(menus) {
    if(!menus || menus.length == 0) return [];
    let nmenus = menus;
    for(let i = 0; i < menus.length; i++) {
      let menu = menus[i];
      if(menu.subMenus && menu.subMenus.length != 0) {
        let subNewMenus = dealMenusStruct(menu.subMenus);
        if(subNewMenus && subNewMenus.length != 0) nmenus = [...nmenus, ...subNewMenus]
      }
    };
    return nmenus;
}
let newMenus = dealMenusStruct(menus);

var validateInOrEq = function(one, tourl) {
    if(!one.subMenus) return false
    let nmenus = dealMenusStruct(one.subMenus);
    var pass = false;
    for(let i = 0; i < nmenus.length; i++) {
        let item = nmenus[i];
        // if(item.url == tourl) {
        if(tourl.indexOf(item.url) != -1) {
          pass = true;
          break;
        }
    }
    return pass;
}
// 做菜单跳转控制
router.beforeEach((to, from, next) => {
    let toUrl = to.path;
    let target = '';
    for(let i = 0; i < newMenus.length; i++) {
        let one = newMenus[i];
        if(one.url == toUrl && one.subMenus) {
            // 设置下一级默认路由跳转
            target = one.subMenus[0].url || '';
            break;
        }
        let result = validateInOrEq(one, toUrl);
        // 区别刷新
        if(!from.name && !!result) {
          // 设置二级 三级菜单的最新数据  lv为菜单数据层级
          setTimeout(()=>{moduleEvent.$emit(\`menus\${one.lv}\`, one.subMenus);}, 180)
        } 
        else if(!!result) {
          // 设置二级 三级菜单的最新数据  lv为菜单数据层级
          moduleEvent.$emit(\`menus\${one.lv}\`, one.subMenus)
        }
        
    }
    //moduleEvent
    if(target != '') next(target);
    else next();
})
export default router
`