module.exports =`
<template>
    <el-card  shadow='hover' style='margin-bottom: 20px;' :body-style='bodyStyle'>
        <div slot="header" class="clearfix" >
            <div v-if='$slots.header'>
                <slot name='header'></slot>
            </div>
            <div v-else>
                <span>{{title}}</span>
                <div style="float: right;">
                    <div :class='css.rightRow'>
                        <el-button :class='css.collapseBtn' v-show='hide' @click='collpaseAction' v-if='contentShow' size='mini'>收起</el-button>
                        <el-button :class='css.collapseBtn' @click='collpaseAction' v-else size='mini'>展开</el-button>
                        <slot name='right'></slot>
                    </div>
                </div>
            </div>
        </div>
        <el-collapse-transition>
                <div v-show='contentShow'>
                    <slot></slot>
                </div>
        </el-collapse-transition>
        <span v-show='!contentShow' :class='css.collapseSpan'>内容已收起</span>
    </el-card>
</template>
<script>
    /**@argument
     *  标准系统面板
     * **/
    import css from './panel.css';
    export default {
        name: 'panel-view',
        props: {
            title: {
                default: '',
                type:String
            },
            bodyStyle: {
                default: function() {return {}},
                type: Object
            },
            hide: {
                default: false,
                type: Boolean
            }
        },
        data: function () {
            return {
                css,
                contentShow: true
            }
        },
        computed: {

        },
        mounted: function () {
        },
        methods: {
            collpaseAction() {
                this.contentShow = !this.contentShow;
            }
        },
        components: {
        },
        watch: {
        }
    }
</script>
` 