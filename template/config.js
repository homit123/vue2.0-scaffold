module.exports = `var config = {

    development: {
    },

    staging: {

    },

    production: {
    }
}

var def = {
    // 为了兼容后端的微服务接口
    getApi(apiName) {
        return apiName?(this[apiName] || '/'):'/';
    }
}
module.exports = Object.assign(def, config[process.env.NODE_ENV || "development"])`