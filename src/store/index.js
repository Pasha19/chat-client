import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import actions from './actions'
import Api from '../api'

Vue.use(Vuex)

const state = {
    token: null,
    user: {},
    messages: []
}

const token = localStorage.getItem('auth_token')
const api = new Api(process.env.API)
api.setAuth(token)

const store = new Vuex.Store({
    state,
    mutations,
    actions: actions(api),
    strict: process.env.NODE_ENV !== 'production'
})

store.commit('setToken', token)

if (module.hot) {
    module.hot.accept([
        './actions',
        './mutations'
    ], () => {
        store.hotUpdate({
            actions: require('./actions')(api),
            mutations: require('./mutations')
        })
    })
}

export default store
