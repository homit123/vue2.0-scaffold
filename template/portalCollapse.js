module.exports = `
<template>
        <el-row>
            <div style='line-height: 55px;color: white;text-align: center;'>e</div>
            <div :class='css.collapseRow'>11
                    <router-link 
                        active-class='collapseMenuActive'
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
            name: 'collapse-menu-view',
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
    </style>`