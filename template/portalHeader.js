module.exports = `
<template>
    <el-row>
        <div :class='css.headersRow'>
                <!-- <el-button @click="changeCollapseHandler" size='mini'>切换</el-button> -->
                <router-link 
                    active-class='headerMenuActive'
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
    import storejs from 'storejs';
    export default {
        name: 'header-view',
        data: function () {
            return {
                css,
                menus: []
            }
        },
        computed: {
        },
        mounted: function () {
            this.$event.$on("menus", menus => {
                this.menus = menus;
            });
        },
        methods: {
            changeCollapseHandler() {
                let collapse = storejs('collapse') || '1';
                if(collapse == '1') {
                    this.$event.$emit("collapse", '2');
                    storejs.set('collapse', '2');
                }
                else if(collapse == '2') {
                    this.$event.$emit("collapse", '1');
                    storejs.set('collapse', '1');
                }
            }
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