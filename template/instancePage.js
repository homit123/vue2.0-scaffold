module.exports = `<template>
<div>
    {{MODULENAMEData}}
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
name: 'MODULENAME-index',
data: function() {
    return {

    }
},
computed: {
    ...mapGetters({
        MODULENAMEData: 'MODULENAME/data'
    })
},
mounted: function() {
},
methods: {
    ...mapActions({
        MODULENAMEAction: 'MODULENAME/getByParams'
    })
},
components: {
},
watch: {
}
}
</script>`