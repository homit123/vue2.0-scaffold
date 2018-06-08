module.exports = `
<template>
    <div>
            <el-form  :model="params" label-width="100px" ref="sForm" label-position="right">
                    <slot></slot>
                    <el-row v-for='i in rows' :key='i' :gutter="20">
                        <el-col :span="8" v-if='options[(i-1)*3]'>
                            <search-sprite :params='params' @changeAction='changeHandler' :form-one='options[(i-1)*3]'></search-sprite>
                        </el-col>
                        <el-col :span="8" v-if='options[(i-1)*3+1]'>
                            <search-sprite :params='params' @changeAction='changeHandler' :form-one='options[(i-1)*3+1]'></search-sprite>
                        </el-col>
                        <el-col :span="8" v-if='options[(i-1)*3+2]'>
                            <search-sprite :params='params' @changeAction='changeHandler' :form-one='options[(i-1)*3+2]'></search-sprite>
                        </el-col>
                    </el-row>
            </el-form>
    </div>
</template>

<script>
    import searchSprite from './searchSprite';
    export default {
        props: {
            options: {
                default: function() {return []},
                type: Array
            },
            storeName: {
                default: 'test',
                type: String
            },
            params: {
                default: function() {return {}},
                type: Object
            },
            hash: {
                default: true,
                type: Boolean
            }
        },
        name: 'search-comps',
        data: function () {
            return {
                rows: Math.ceil(this.options.length/3)
            }
        },
        mounted() {
            let routerQuery = this.$route.query;
            if(routerQuery) Object.assign(this.params, routerQuery);
        },
        methods: {
           async search(params = {}) {
                Object.assign(this.params, params);
                let res = await this.$store.dispatch(\`\${this.storeName}/getList\`, this.params);
                this.$emit("search-ok");
                if(this.hash) {
                    // 改变hash
                    this.$router.replace({path: this.$route.path, query: this.params});
                }
            },
            async reset() {
                this.$refs['sForm'].resetFields();
                this.search();
            },
            changeHandler(item, formOne) {
                this.$emit("changeAction", item, formOne);
            }
        },
        components: {
            searchSprite
        }
    };
</script>
`