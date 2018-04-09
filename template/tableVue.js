module.exports = `<template>
<div v-loading="loading">
    <div>
        <div class="table-e">
            <el-table 
                :height="height" 
                :key="name" 
                :border="border" 
                :highlight-current-row="highlight"
                :data="datas"
                :stripe="stripe"
                :show-header="showHeader"
                @sort-change="sortChange" 
                @select="selectItem" 
                @cell-click="cellClick" 
                @select-all="selectAll"
                @selection-change="selectionChange">
                <!--选择-->
                <el-table-column v-if="select" type="selection" :selectable="selectFun" width="55"></el-table-column>
                <!--序号-->
                <el-table-column v-if="index" type="index" width="55"></el-table-column>
                <!--自定义项-->
                <el-table-column 
                    v-for="(one, index) in headers" 
                    :key="index" 
                    :render-header="one.renderHeader || renderHeader"
                    :fixed="one.fixed" 
                    :label="one.label" 
                    :prop="one.labelName" 
                    :type="one.type" 
                    :sortable="one.sortable" 
                    :width="one.width" 
                    :min-width="one.minWidth">
                    <template slot-scope="scope">
                        <div v-if="one.operator">
                           
                        </div>
                        <div v-else-if="one.type == 'comps'">
                                <!--处理点击事件-->
                                <self-comps :slot-render="\$scopedSlots.default" :row="scope.row" :index="scope.\$index" :tpl-data="one"></self-comps>
                        </div>
                        <!--txt形式-->
                        <div v-else-if="one.type == 'txt'">
                                {{scope.row[one.labelName]}}
                        </div>
                        <!--price形式-->
                        <div v-else-if="one.type == 'price'">
                                <!--TODO-->
                        </div>
                        <!--date形式-->
                        <div v-else-if="one.type == 'date'">
                                {{scope.row[one.labelName] | dateFormate(one.formate || 'yyyy-mm-dd')}}
                        </div>
                    </template>
                </el-table-column>
                <div slot="empty">
                    没有数据
                </div>
                <div slot="append">
                    <slot name="append"></slot>
                </div>
            </el-table>
        </div>
        <slot></slot>
    </div>
    <div class="table-pagination">
        <el-pagination
            @current-change="pageChange" 
            :current-page="pageInfo.page" 
            :page-size="pageInfo.size" 
            layout="total,  prev, pager, next, jumper"
            :total="counts">
        </el-pagination>
    </div>
</div>
</template>

<script>

import baseTable from "./table";
import Vue from "vue";

const selfComps = Vue.extend({
name: "selfComps",
props: {
    // 自定义插槽
    slotRender: {
        default: function () { return function () { } },
        type: Function
    },
    // 单行数据对象
    row: {
        default: function () { return {} },
        type: Object
    },
    // 第几行
    index: {
        default: 0,
        type: Number
    },
    // 指定模板所属名
    tplData: {
        default: function () { return {} },
        type: Object
    }
},
data: function () {
    return {
    }
},
render: function (h) {
    return h('div', this.slotRender({ tplName: this.tplData.tplName, row: this.row, index: this.index }));
},
mounted: function () {
}
})
export default {
mixins: [baseTable],
name: 'table-e',
data: function () {
    return {
    }
},
methods: {
},
computed: {
},
mounted: function () {
},
components: {
    selfComps
}
};
</script>`