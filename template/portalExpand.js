module.exports = `
<template>
        <el-row>
            <div style='line-height: 55px;color: white;text-align: center;'>这是一个项目</div>
            <div :class='css.menusRow'>
                    <router-link 
                        active-class='expandMenuActive'
                        v-for='(menu, i) in menus'
                        :key='i'
                        :to="{path: menu.url}"
                        >
                        {{menu.name}}
                    </router-link>
            </div>
        </el-row>
    </template>
    <script>
        import css from './portal.css';
        export default {
            name: 'expand-menu-view',
            data: function () {
                return {
                    css,
                    menus: []
                }
            },
            computed: {
            },
            created: function() {
               
            },
            mounted: function () {
                this.$event.$on("menus1", menus => {
                    this.menus = menus;
                });
            },
            methods: {
            },
            components: {
            },
            watch: {
            }
        }
    </script>
    <style>
    </style>
`