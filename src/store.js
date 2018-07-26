import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'
let token = localStorage.getItem('auth_token')

export default new Vuex.Store({
    state: {
        token
    },
    mutations: {
        setToken (state, payload) {
            state.token = payload
        },
        delToken (state) {
            state.token = null
        }
    },
    actions: {
        register ({ commit }, name) {
            let request = fetch(
                '/api/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name })
                }
            )
            request
                .then(response => response.json())
                .then(response => {
                    let status = response.status || 'error'
                    if (status === 'error') {
                        let error = response.reason || 'unknown error'
                        alert(`Error "${error}"`)

                        return
                    }
                    let token = response.data.auth_token
                    localStorage.setItem('auth_token', token)
                    commit('setToken', token)
                })
        }
    }
})
