module.exports = `
<template>
        <el-container :class='css.pageView'>
            <el-aside width='60px' :class='css.asideBox'  v-show='collapse == "2"'>
                    <transition name="el-zoom-in-center">
                        <collapse-menus v-show='collapse == "2"'></collapse-menus>
                    </transition>
            </el-aside>
            <el-aside width='200px' :class='css.asideBox' v-show='collapse == "1"'>
                    <transition name="el-zoom-in-center">
                        <expand-menus v-show='collapse == "1"'></expand-menus>
                    </transition>
            </el-aside>
            <el-container>
                <el-header :class='css.headerBox'>
                    <header-view></header-view>
                </el-header>
                <el-main>
                    <slot></slot>    
                </el-main>
            </el-container>
        </el-container>
</template>
<script>
    import css from "./frame.css";
    import headerView from '@/portal/headerView';
    import expandMenus from '@/portal/expandMenus';
    import collapseMenus from '@/portal/collapseMenus';
    import storejs from 'storejs';
    export default {
        name: 'page-view',
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
            this.$event.$on("collapse", collapse => {
                this.collapse = collapse;
            });
        },
        methods: {
        },
        components: {
            headerView,expandMenus, collapseMenus
        },
        watch: {
        }
    }
</script>
<style>
</style>
`