module.exports = `/**
* 仅接收数组列表
* 
* 表格的抽象类
* 列表的抽象类
* 
* 列表场景的复杂度不高，目前仅支持列表的分页查询功能，出现额外场景可以继承此类扩展
*/
const grid = {
   props: {
       datas: {
           default: function () {
               return [];
           },
           type: Array
       },
       counts: {
           default: 0,
           type: Number
       },
       // loading状态
       loading: {
           default: false,
           type: Boolean
       },
       pagination: {
           default: true,
           type: Boolean
       },
       // 分页控制
       pageInfo: {
           default: function() {return {pageNo:1, pageSize:20}},
           type: Object
       },
       name: {
           // 某个业务场景下的grid名称  标记唯一性命名
           default: "tableOrlist",
           type: String,
           required: true
       },
       hash: {
            default: true,
            type: Boolean
       },
       storeName: {
            default: '',
            type: String
        },
        params: {
            default: function() {return {}},
            type: Object
        }
   },
   data: function () {
       return {
            searchInstance:{}
       };
   },
   computed: {
   },
   mounted: function () {
       // 初始化page 数据 从url中提取 是否需要控制  看实际业务场景的概率情况
       this.pageInfo.pageNo = this.$route.query.pageNo || 1;
   },
   methods: {
       // 行点击
       rowClick: function (row, event, column) {
           this.$emit("rowClick", row);
       },
       // 分页切换
       pageChange: function (page) {
           this.pageInfo.pageNo = page || 1;
           // grid不做任何的数据动作，一切的数据动作统一到search组件
           this.$emit("pageChange", this.pageInfo);
           if(this.searchInstance.search) this.searchInstance.search(this.pageInfo);
           else if(this.storeName != '') {
              Object.assign(this.params, {pageNo: page});
              this.$store.dispatch(\`\${this.storeName}/getList\`, this.params);
              if(this.hash) {
                    this.$router.replace({path: this.$route.path, query: this.params});
              }
           }
       },
       setSearch: function(search) {
            this.searchInstance = search
       }
   },
   watch: {},
   components: {}
};

export default grid;

`