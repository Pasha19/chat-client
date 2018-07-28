import Api from '../api'

const api = new Api(process.env.API)

export const register = ({ commit }, name) => {
    api.register(name, data => {
        const token = data.auth_token
        localStorage.setItem('auth_token', token)
        commit('setToken', token)
        api.setAuth(token)
    })
}

export const listen = ({ commit, state }) => {
    if (api.getAuth() === null) {
        api.setAuth(state.token)
    }
    api.listen(message => commit('addMessage', message.data))
}

export const post = ({ commit, state }, message) => {
    if (api.getAuth() === null) {
        api.setAuth(state.token)
    }
    api.post(
        message,
        data => commit('addMessage', {
            user: { name: 'me' },
            message,
            time: data.time
        })
    )
}
