module.exports = `<template>
<div v-loading="loading" :style="{minHeight: minHeight}">
    <div>
        <slot v-for="(item, index) in datas" :item="filterFun(item)"></slot>
        <div v-if="counts == 0">没有数据</div> 
    </div>
    <div v-if="pagination && counts > pageInfo.size)">
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
import baseList from "./baseList";
export default {
mixins: [baseList],
name: 'list-e',
data: function() {
    return {
    }
},
methods: {
},
};
</script>`