export default (api) => {
    return {
        register ({ commit }, name) {
            api.register(name, data => {
                const token = data.auth_token
                localStorage.setItem('auth_token', token)
                commit('setToken', token)
                api.setAuth(token)
            })
        },
        listen ({ commit, state }) {
            api.listen(message => commit('addMessage', message.data))
        },
        post ({ commit, state }, message) {
            api.post(
                message,
                data => commit('addMessage', {
                    user: { name: 'me' },
                    message,
                    time: data.time
                })
            )
        }
    }
}
