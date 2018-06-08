module.exports = `
<template>
        <div>
        MODULENAMEData
        </div>
    </template>
    <script>
        /**@argument
         *  home
         * **/
        import basePage from 'basePage';
        import { mapGetters, mapActions } from 'vuex';
        export default {
            name: 'MODULENAME-view',
            mixins: [basePage],
            data: function () {
                return {
                   
                }
            },
            computed: {
                ...mapGetters({
                    MODULENAMEData: 'home/data'
                })
            },
            mounted: function () {
            },
            methods: {
                ...mapActions({
                    MODULENAMEAction: 'home/getList'
                })
            },
            components: {
            },
            watch: {
            }
        }
    </script>`