module.exports = `<template>
    <div :class='defTheme'>
        <router-view></router-view>
    </div>
</template>
<script>
import css from "./app.scss";
export default {
name: 'AppView',
data: function() {
return {
    defTheme: "custom-red"
}
},
computed: {
},
mounted: function() {
    // 切换主题demo
    setInterval(()=>{
        this.defTheme = this.defTheme == 'custom-red'?'custom-blue':'custom-red'
    }, 2000)
},
methods: {

},
components: {
},
watch: {
}
}
</script>`