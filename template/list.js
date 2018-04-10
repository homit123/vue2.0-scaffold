module.exports = `import grid from "../grid";
const table = {
    mixins: [grid],
    props: {
        // 列表高度
        minHeight: {
            default: 300,
            type:Number
        },
        // 可能发生的数据过滤需求
        filterFun: {
            type: Function,
            default(data) {
                return data
            },
        },
    },
    data: function () {
        return {};
    },
    computed: {
    },
    mounted: function () {},
    methods: {
    },
    watch: {},
    components: {}
};

export default table;
`