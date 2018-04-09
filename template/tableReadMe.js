module.exports = `\`\`\` <template>
<div>
    <table-e 
        name="test" 
        :datas="list" 
        :counts="1000" 
        :loading="loading" 
        :headers="headers">
            <template slot-scope="props">
                <div v-if="props.tplName == 'xx'">
                    {{props.row}}
                </div>
            </template>
    </table-e>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import tableE from "@/components/table/table.vue";
export default {
    name: 'home-index',
    data: function () {
        return {
            loading: true,
            list: [
                {
                    date: '2016-05-02',
                    name: '王小虎1',
                    address: '上海市普陀区金沙江路 1518 弄'
                }
            ],
            headers: [{
                type: 'comps',
                tplName: "xx",
                label: '姓名',
                labelName: "name"
            }]
        }
    },
    computed: {
        ...mapGetters({
            homeData: 'home/data'
        })
    },
    mounted: function () {
        setTimeout(() => {
            this.loading = false
        }, 3000);
    },
    methods: {
        ...mapActions({
            homeAction: 'home/getByParams'
        })
    },
    components: {
        tableE
    },
    watch: {
    }
}
</script> \`\`\``