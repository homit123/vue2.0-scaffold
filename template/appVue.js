module.exports = `<template>
<div :class="css.appBox" ref='appView'>
    <router-view></router-view>
</div>
</template>
<script>
import "./app.scss";
import css from './app.css';
export default {
    name: 'AppView',
    data: function () {
        return {
            css,
        }
    },
    computed: {
    },
    mounted: function () {
        this.$event.$on('errorNetWork', msg => {
            this.$message.error(msg);
        })
        this.$nextTick(()=>{
            this.$refs.appView.style.height = window.screen.height + 'px';
        })
    },
    methods: {

    },
    components: {
    },
    watch: {
    }
}
</script>`