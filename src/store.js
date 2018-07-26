import Vue from 'vue'
import Vuex from 'vuex'
import 'event-source-polyfill'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'
let token = localStorage.getItem('auth_token')
let es = null

export default new Vuex.Store({
    state: {
        token,
        messages: []
    },
    mutations: {
        setToken (state, payload) {
            state.token = payload
        },
        delToken (state) {
            state.token = null
        },
        addMessage (state, message) {
            state.messages.push(message.data)
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
        },
        listen ({ commit }) {
            if (es !== null) {
                return
            }
            /* global EventSourcePolyfill */
            es = new EventSourcePolyfill(
                '/api/chat/listen',
                {
                    headers: {
                        'Authorization': this.state.token
                    }
                }
            )
            es.addEventListener('message', data => {
                let message = JSON.parse(data.data)
                commit('addMessage', message)
            })
            es.addEventListener('error', error => {
                console.log('error', error)
            })
            es.addEventListener('close', data => {
                console.log('close', data)
            })
        }
    }
})
