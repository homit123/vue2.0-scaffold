module.exports = `// home模块主视图
const mdouleView = resolve => require(['@/modules/moduleView'], resolve)

// 
const homeView = resolve => require(['@/modules/home/index'], resolve)
module.exports = [
    {
        path: "home",
        component: mdouleView,
        name: "home",
        children: [
            {
                path: "/",
                name: "home",
                component: homeView,
            }
        ]
    }
]`