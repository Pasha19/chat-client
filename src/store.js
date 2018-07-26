import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'
let token = localStorage.getItem('auth_key')

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

    }
})
