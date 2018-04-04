module.exports = `const http = {
    post: function (action, params) {
        return instanceAxios
            .post(action, params)
            .then(function (response) {
                return response
            })
            .catch((e) => {
                return Promise.reject();
            })
    },
    get: function (action, params) {
        return instanceAxios
            .get(action, {params: params})
            .then(function (response) {
                return response
            })
    },
    put: function (action, params) {
        return instanceAxios
            .put(action, params)
            .then(function (response) {
                return response
            })
            .catch(() => {
                return Promise.reject();
            })
    },
    delete: function (action, params) {
        return instanceAxios
            .delete(action, {data: params})
            .then(function (response) {
                return response
            })
            .catch(() => {
                return Promise.reject();
            })
    }
}

export default http
`