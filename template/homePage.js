module.exports = `<template>
<div>
    home 
    {{homeData}}
    <el-button type="primary">home</el-button>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
name: 'home-index',
data: function() {
    return {

    }
},
computed: {
    ...mapGetters({
        homeData: 'home/data'
    })
},
mounted: function() {
},
methods: {
    ...mapActions({
        homeAction: 'home/getByParams'
    })
},
components: {
},
watch: {
}
}
</script>`