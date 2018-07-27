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
            state.messages.push(message)
        }
    },
    actions: {
        register ({ commit }, name) {
            let request = fetch(
                process.env.API + '/api/register',
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
                process.env.API + '/api/chat/listen',
                {
                    headers: {
                        'Authorization': this.state.token
                    },
                    withCredentials: true
                }
            )
            es.addEventListener('message', data => {
                let message = JSON.parse(data.data)
                commit('addMessage', message.data)
            })
            es.addEventListener('error', error => {
                console.log('error', error)
            })
            es.addEventListener('close', data => {
                console.log('close', data)
            })
        },
        post ({ commit }, message) {
            let request = fetch(
                process.env.API + '/api/chat/post',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': this.state.token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message })
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
                    let time = response.data.time
                    commit('addMessage', {
                        user: { name: 'me' },
                        message,
                        time
                    })
                })
        }
    }
})
