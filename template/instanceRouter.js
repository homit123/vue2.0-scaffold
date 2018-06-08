module.exports = `// 模块主视图
const mdouleView = resolve => require(['@/modules/moduleView'], resolve)

// 
const MODULENAMEView = resolve => require(['@/modules/MODULENAME/index'], resolve)
module.exports = [
    {
        path: "MODULENAME",
        component: mdouleView,
        children: [
            {
                path: "index",
                name: "MODULENAME",
                component: MODULENAMEView,
            }
        ]
    }
]`