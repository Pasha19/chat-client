export default (api) => {
    return {
        register ({ commit }, name) {
            return api.register(name)
                .then(data => {
                    const token = data.auth_token
                    localStorage.setItem('auth_token', token)
                    commit('setToken', token)
                    api.setAuth(token)
                })
        },
        listen ({ commit, state }) {
            api.listen(message => commit('addMessage', message))
        },
        post ({ commit, state }, message) {
            api.post(message)
                .then(data => commit('addMessage', {
                    user: state.user,
                    message,
                    time: data.time
                }))
        },
        close: api.close
    }
}
