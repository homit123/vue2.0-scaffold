module.exports = `// 生成一个公共的store
import fetch from '@/fetch';
import _ from "../utils/lodash";
import config from "@/config/config";
/**
 *
 * @param {*} action  请求地址
 * @param {*} obj  参数对象，传入的参数可以替换默认store
 * @param {*} apiName  配合后端微服务 不同接口前缀
 */
// 
const Store = (action, obj = {}, apiName = '') => {
    let api = \`\${config.getApi(apiName)}\${action}\`;
    const store = {
        namespaced: true,
        state: {
            // 异步loading控制
            loading: false,
            // 数据列表
            list: [],
            // 数据对象
            data: {},
            // 数据条数
            count: 0
        },
        getters: {
            // 获取状态数据
            data(state, getters) {
                return state
            }
        },
        mutations: {
            // 突变数据
            setOne(state, res) {
                if(res.code != 200) {

                }
                else {
                    state.data = res.data
                }
                state.loading = false;
            },
             // 突变列表
             setList(state, res) {
                if(res.code != 200) {

                }
                else {
                    state.list = res.docs;
                    state.count = res.count;
                }
                state.loading = false;
            },
            // 开启loading
            changeLoading(state) {
                state.loading = true;
            }
        },
        actions: {
            // 获取单条数据
            getByParams({ state, commit }, params = {}) {
                commit('changeLoading');
                return fetch.get(api, params).then(res => {
                    commit('setOne', res)
                    return res
                })
            },
             // 获取单条数据
             getById({ state, commit }, id) {
                commit('changeLoading');
                return fetch.get(\`\${api}/\${id}\`, {}).then(res => {
                    commit('setOne', res)
                    return res
                })
            },

            // 获取列表数据
            getList({ state, commit }, params = {}) {
                commit('changeLoading');
                return fetch.get(api, params).then(res => {
                    commit('setList', res)
                    return res
                })
            },

            // 新增数据
            post({ state, commit }, params = {}) {
                commit('changeLoading');
                return fetch.post(api, params).then(res => {
                    return res;
                })
            },

             // 修改数据
            put({ state, commit }, params = {}) {
                commit('changeLoading');
                return fetch.put(api, params).then(res => {
                    return res;
                })
            },

            // 删除数据
            delete({ state, commit }, id) {
                commit('changeLoading');
                return fetch.delete(\`\${api}/\${id}\`, {}).then(res => {
                    return res;
                })
            }
        }
    }

    const newStore = _.merge({}, store, obj)

    return newStore
}

export default Store

`