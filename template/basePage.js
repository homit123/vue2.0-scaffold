module.exports = `
const basePage = {
    data: function () {
        return {
            pagePanel: {padding: "0px", marginTop: "-1px"}
        };
    },
    computed: {
    },
    mounted: function () {
    },
    methods: {
        // 格式化 params 为 query
        getParams(params) {
            let query = [];
            for(let i in params) {
                query.push(\`\${i}=\${params[i]}\`);
            }
            return query.join('&');
        }
    },
    watch: {},
    components: {}
 };
 
 export default basePage;
 `