module.exports =`
<template>
        <el-row>
            <expand-menus v-show='collapse == "1"'></expand-menus>
            <collapse-menus v-show='collapse == "2"'></collapse-menus>
        </el-row>
    </template>
    <script>
        import css from './portal.css';
        import expandMenus from './expandMenus';
        import collapseMenus from './collapseMenus';
        import storejs from "storejs";
        // collapse  1展开  2折叠
        export default {
            name: 'menu-view',
            data: function () {
                return {
                    css,
                    collapse: -1
                }
            },
            computed: {
            },
            mounted: function () {
                this.collapse = storejs('collapse') || '1';
                storejs.set('collapse', this.collapse);
                this.$event.$on("collapse", collapse => {
                    this.collapse = collapse;
                    storejs.set('collapse', collapse);
                });
            },
            methods: {
            },
            components: {
                expandMenus, collapseMenus
            },
            watch: {
            }
        }
    </script>
    <style>
    </style>
` 